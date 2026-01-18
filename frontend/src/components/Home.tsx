import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import FeaturedWatches from "./FeaturedWatches";
import Testimonials from "./Testimonials";
import LogoLoop from "./LogoLoop";
import TrustSignals from './TrustSignals';

// Local watch images
import casio1Image from "./watchesimg/casio-1.jpg";
import fossil1Image from "./watchesimg/fossil-1.jpg";
import rolex1Image from "./watchesimg/rolex-1.jpg";

import bgwatchImage from "./watchesimg/bgwatch.jpg"; // hero background image (bgwatch)
import rolexLogo from "./logo/Rolex-logo.png";
import omegaLogo from "./logo/Omega-logo-768x432.png";
import casioLogo from "./logo/Casio-Logo-768x432.png";
import fossilLogo from "./logo/Fossil-Logo-768x432.png";
import titanLogo from "./logo/titan.jpg";
import seikoLogo from "./logo/Seiko-Logo-768x432.png";
import tissotLogo from "./logo/Tissot-Logo-768x432.png";
import hublotLogo from "./logo/Hublot-logo-768x432.png";

const Home: React.FC = () => {
  // New arrivals data
  const newArrivals = [
    {
      id: 1,
      name: "Rolex Submariner",
      price: 9800,
      image: rolex1Image,
      isNew: true,
    },
    {
      id: 2,
      name: "Fossil Grant Chronograph",
      price: 180,
      image: fossil1Image,
      isNew: true,
    },
    {
      id: 3,
      name: "Casio G-Shock",
      price: 380,
      image: casio1Image,
      isNew: true,
    },
  ];

  // Features
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "2-Year Warranty",
      description: "Comprehensive coverage for all timepieces", 
    },
    {
      icon: <Truck className="h-8 w-8 text-white" />,
      title: "Free Worldwide Shipping",
      description: "Complimentary delivery on orders above ₹5,000",
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "24/7 Support",
      description: "Expert assistance whenever you need it",
    },
  ];

  // Brand logos for the LogoLoop component
  const brandLogos = [
    { src: rolexLogo, alt: "Rolex", href: "https://www.rolex.com" },
    { src: omegaLogo, alt: "Omega", href: "https://www.omegawatches.com" },
    { src: casioLogo, alt: "Casio", href: "https://www.casio.com" },
    { src: fossilLogo, alt: "Fossil", href: "https://www.fossil.com" },
    { src: titanLogo, alt: "Titan", href: "https://www.titan.co.in" },
    { src: seikoLogo, alt: "Seiko", href: "https://www.seikowatches.com" },
    { src: tissotLogo, alt: "Tissot", href: "https://www.tissotwatches.com"},
    { src: hublotLogo, alt: "Hublot", href: "https://www.hublot.com"}
  ];

  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={bgwatchImage}
            alt="Luxury Watch Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-20 text-center text-white max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            Timeless <span className="text-white block">Elegance</span>
          </h1>
          <p className="text-xl md:text-1xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Discover the perfect blend of Swiss craftsmanship and modern sophistication in our luxury timepieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-black px-8 py-4 rounded-md font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2 group shadow-lg"
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
              Our Heritage
            </Link>
          </div>

          <TrustSignals />
        </motion.div>
      </section>

      {/* Featured Watches */}
      <motion.section
        className="py-20 bg-gray-50"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <FeaturedWatches />
      </motion.section>

      {/* New Arrivals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our latest collection of exceptional timepieces, crafted with precision and attention to detail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newArrivals.map((watch, idx) => (
              <motion.div
                key={watch.id}
                className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                {watch.isNew && (
                  <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    New
                  </span>
                )}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{watch.name}</h3>
                  <p className="text-2xl font-bold text-black">₹{watch.price.toLocaleString()}</p>
                  <button className="w-full mt-4 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-black font-semibold hover:text-gray-700 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brands with Fixed LogoLoop */}
      <motion.section
        className="py-20 bg-gray-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Premium <span className="text-yellow-600">Brands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            We partner with the world's most prestigious watchmakers to bring you authentic timepieces
          </p>
          
          <div className="w-full" style={{ height: '120px' }}>
            <LogoLoop
              logos={brandLogos}
              speed={100}
              logoHeight={50}
              gap={100}
            />
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        className="py-20 bg-black text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Watches</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience unparalleled service and quality with every timepiece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-lg mb-6 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  {React.cloneElement(feature.icon, { 
                    className: "h-8 w-8 group-hover:text-black" 
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Testimonials />
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-20 bg-black text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Timepiece?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who have chosen our collection for their luxury watch needs.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            <span>Shop Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
