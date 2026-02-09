import express from 'express';
import Complaint from '../models/Complaint.js';
<<<<<<< HEAD
import { sendComplaintMail } from '../utils/sendMail.js';
=======
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6

const router = express.Router();

// POST /api/complaints - Create new complaint
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject, and message are required'
      });
    }

<<<<<<< HEAD
    // Save complaint to database
=======
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    const complaint = new Complaint({
      name,
      email,
      subject,
      message
    });

    const savedComplaint = await complaint.save();
    
<<<<<<< HEAD
    // Send emails asynchronously (don't block response if email fails)
    sendComplaintMail({ name, email, subject, message }).catch(error => {
      console.error('[Complaint Route] Email sending failed:', error);
      // Log error but don't fail the request
    });
    
=======
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      data: savedComplaint
    });
  } catch (error) {
<<<<<<< HEAD
    console.error('[Complaint Route] Error:', error);
=======
>>>>>>> 2d2447836291bb1712f79b1df66c3981ea700cf6
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/complaints - Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/complaints/:id - Get complaint by ID
router.get('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }
    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE /api/complaints/:id - Delete complaint
router.delete('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
