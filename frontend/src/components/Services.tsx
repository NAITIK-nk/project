import { useEffect, useRef, useState } from 'react';
import { Truck, Shield, Clock, Award, Wrench, Phone } from 'lucide-react';

type RevealOpts = {
  threshold?: number;
  rootMargin?: string;
};

const useReveal = (opts: RevealOpts = {}) => {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = opts;
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, root: null, rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
};

const Services = () => {
  const mainServices = [
    {
      icon: <Truck className="h-12 w-12 text-yellow-600" />,
      title: 'Free Worldwide Shipping',
      description:
        'Complimentary shipping on all orders above ₹5,000. Express delivery available worldwide with full insurance coverage.',
      features: ['Express delivery in 2-3 business days', 'Full insurance coverage', 'Tracking included', 'Signature required'],
    },
    {
      icon: <Shield className="h-12 w-12 text-yellow-600" />,
      title: '2-Year International Warranty',
      description:
        'Comprehensive warranty coverage for all timepieces purchased through SAMAY, honored at authorized service centers worldwide.',
      features: ['International warranty coverage', 'Authorized service centers globally', 'Original parts guarantee', 'Water resistance testing'],
    },
    {
      icon: <Clock className="h-12 w-12 text-yellow-600" />,
      title: '24/7 Customer Support',
      description:
        'Expert assistance available around the clock. Our specialists are here to help with any questions or concerns.',
      features: ['24/7 multilingual support', 'Expert watch specialists', 'Live chat available', 'Phone and email support'],
    },
  ];

  const additionalServices = [
    { icon: <Award className="h-8 w-8 text-yellow-600" />, title: 'Authentication Guarantee', description: 'Every authenticated listing includes a certificate of authenticity and detailed documentation.' },
    { icon: <Wrench className="h-8 w-8 text-yellow-600" />, title: 'Professional Servicing', description: 'Expert maintenance and repair services by certified technicians at authorized centers worldwide.' },
    { icon: <Phone className="h-8 w-8 text-yellow-600" />, title: 'Personal Consultation', description: 'One-on-one consultations with our watch experts to help you find the perfect timepiece.' },
  ];

  const serviceProcess = [
    { step: '01', title: 'Contact Us', description: 'Reach out to our customer service team via phone, email, or live chat.' },
    { step: '02', title: 'Schedule Service', description: 'Book an appointment at your nearest authorized service center.' },
    { step: '03', title: 'Expert Assessment', description: 'Our certified technicians will thoroughly examine your timepiece.' },
    { step: '04', title: 'Service Complete', description: 'Your watch is serviced with genuine parts and returned with a service warranty.' },
  ];

  // Reveal hooks per section
  const hero = useReveal();
  const main = useReveal();
  const process = useReveal();
  const extra = useReveal();
  const centers = useReveal();
  const cta = useReveal();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={hero.ref}
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: hero.visible ? 1 : 0,
            transform: hero.visible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Premium Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience unparalleled service and support with every purchase on SAMAY. Our commitment to excellence extends far beyond the point of purchase.
          </p>
        </div>

        {/* Main Services */}
        <section
          ref={main.ref}
          className="mb-20 transition-all duration-700"
          style={{
            opacity: main.visible ? 1 : 0,
            transform: main.visible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainServices.map((service, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-500 will-change-transform"
                style={{
                  opacity: main.visible ? 1 : 0,
                  transform: main.visible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-md mb-4 transition-transform duration-500 group hover:scale-105">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Service Process */}
        <section
          ref={process.ref}
          className="mb-20 transition-all duration-700"
          style={{
            opacity: process.visible ? 1 : 0,
            transform: process.visible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Service Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined service process ensures your timepiece receives the expert care it deserves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceProcess.map((step, index) => (
              <div
                key={index}
                className="text-center relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-500"
                style={{
                  opacity: process.visible ? 1 : 0,
                  transform: process.visible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${index * 90}ms`,
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600 text-white rounded-full text-xl font-bold mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>

                {index < serviceProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <div className="w-full h-0.5 bg-gray-300 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section
          ref={extra.ref}
          className="mb-20 transition-all duration-700"
          style={{
            opacity: extra.visible ? 1 : 0,
            transform: extra.visible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-600">Comprehensive support for all your luxury timepiece needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-all duration-500"
                style={{
                  opacity: extra.visible ? 1 : 0,
                  transform: extra.visible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${index * 90}ms`,
                }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service Centers */}
        <section
          ref={centers.ref}
          className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 transition-all duration-700"
          style={{
            opacity: centers.visible ? 1 : 0,
            transform: centers.visible ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Authorized Service Centers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find expert care for your timepiece at our authorized service centers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['North America', 'Europe', 'Asia Pacific', 'Rest of World'].map((region, i) => (
              <div
                key={region}
                className="text-center transition-all duration-500"
                style={{
                  opacity: centers.visible ? 1 : 0,
                  transform: centers.visible ? 'translateY(0)' : 'translateY(12px)',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <h3 className="text-lg font-semibold mb-2">{region}</h3>
                <p className="text-gray-300">{['45+ Locations', '60+ Locations', '35+ Locations', '25+ Locations'][i]}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-yellow-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-yellow-700 transition-colors duration-300">
              Find Service Center
            </button>
          </div>
        </section>

        {/* Contact CTA */}
        <section
          ref={cta.ref}
          className="text-center mt-20 transition-all duration-700"
          style={{
            opacity: cta.visible ? 1 : 0,
            transform: cta.visible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Assistance?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our customer service team is ready to help you with any questions about our services or your timepiece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-yellow-700 transition-colors duration-300">
                Contact Support
              </button>
              <button className="border-2 border-yellow-600 text-yellow-600 px-8 py-3 rounded-md font-semibold hover:bg-yellow-600 hover:text-white transition-colors duration-300">
                Schedule Service
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
