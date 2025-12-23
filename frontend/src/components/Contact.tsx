import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/* -------- Utilities: reveal on scroll -------- */
const useInView = (threshold = 0.2, rootMargin = '0px 0px -10% 0px') => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, root: null, rootMargin }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return { ref, inView };
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSending(false);
    alert("Thank you for your message. We'll get back to you soon!");
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-yellow-600" />,
      title: 'Visit Our Boutique',
      details: ['123 Luxury Street, Hiranandani, Mumbai'],
      extra: 'Monday - Saturday: 10:00 AM - 7:00 PM',
    },
    {
      icon: <Phone className="h-6 w-6 text-yellow-600" />,
      title: 'Call Us',
      details: ['+91 1212121212', '+91 3434343434'],
      extra: '24/7 Customer Support',
    },
    {
      icon: <Mail className="h-6 w-6 text-yellow-600" />,
      title: 'Email Us',
      details: ['info@samay.com', 'support@samay.com'],
      extra: 'We respond within 2 hours',
    },
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM CET' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM CET' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  // Reveal hooks
  const head = useInView();
  const grid = useInView();
  const info = useInView();
  const extra = useInView();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={head.ref}
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: head.inView ? 1 : 0, transform: head.inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get in touch with our team of experts. We're here to help you find the perfect timepiece
            or assist with any questions you may have.
          </p>
        </div>

        <div
          ref={grid.ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 transition-all duration-700"
          style={{ opacity: grid.inView ? 1 : 0, transform: grid.inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="transition-all duration-700" style={{ transitionDelay: '60ms' }}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div className="transition-all duration-700" style={{ transitionDelay: '120ms' }}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="transition-all duration-700" style={{ transitionDelay: '180ms' }}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Information</option>
                  <option value="service">Service Request</option>
                  <option value="warranty">Warranty Claim</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div className="transition-all duration-700" style={{ transitionDelay: '240ms' }}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-yellow-600 text-white py-4 rounded-md font-semibold hover:bg-yellow-700 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <span className="inline-block w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div
            ref={info.ref}
            className="space-y-8 transition-all duration-700"
            style={{ opacity: info.inView ? 1 : 0, transform: info.inView ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                We'd love to hear from you. Choose the most convenient way to reach us,
                and our team will respond promptly to assist you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex space-x-4 transition-all duration-700"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                    <p className="text-sm text-yellow-600 font-medium mt-1">{info.extra}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="bg-gray-50 rounded-lg p-6 transition-all duration-700" style={{ transitionDelay: '300ms' }}>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-5 w-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
              </div>
              <div className="space-y-2">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="font-medium text-gray-900">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* React Leaflet Map */}
            <div className="rounded-lg overflow-hidden shadow-sm h-64 md:h-80">
              <MapContainer
                center={[19.1176, 72.9050]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[19.1176, 72.9050]}>
                  <Popup>SAMAY Boutique — Hiranandani, Mumbai</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div
          ref={extra.ref}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700"
          style={{ opacity: extra.inView ? 1 : 0, transform: extra.inView ? 'translateY(0)' : 'translateY(20px)' }}
        >
          {[
            {
              icon: <Phone className="h-6 w-6 text-yellow-600" />,
              title: 'Expert Consultation',
              text: 'Schedule a personal consultation with our watch experts to find your perfect timepiece.',
            },
            {
              icon: <Mail className="h-6 w-6 text-yellow-600" />,
              title: 'Newsletter',
              text: 'Subscribe to receive updates on new collections, exclusive events, and special offers.',
            },
            {
              icon: <Clock className="h-6 w-6 text-yellow-600" />,
              title: 'After-Sales Service',
              text: 'Professional maintenance and repair services for your SAMAY timepieces worldwide.',
            },
          ].map((card, i) => (
            <div
              key={card.title}
              className="text-center bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-700"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
