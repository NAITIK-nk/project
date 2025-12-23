import { Request, Response } from "express";
import OrderModel from "../models/order.model";
import CartModel from "../models/cart.model";

interface AuthRequest extends Request {
  userId?: string;
}

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await CartModel.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Calculate totals
    const subtotal = cart.total;
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 5000 ? 0 : 150; // Free shipping over $5000
    const total = subtotal + tax + shipping;

    // Create order
    const order = await OrderModel.create({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image,
      })),
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      paymentStatus: 'pending',
    });

    // Clear cart after order creation
    cart.items = [];
    await cart.save();

    await order.populate("items.productId");
    await order.populate("userId", "email name");

    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const orders = await OrderModel.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const order = await OrderModel.findOne({ _id: id, userId })
      .populate("items.productId")
      .populate("userId", "email name");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const order = await OrderModel.findOne({ _id: id, userId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (status) {
      order.status = status;
    }
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();
    await order.populate("items.productId");

    res.json(order);
  } catch (err) {
    console.error("Update order error:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
};

