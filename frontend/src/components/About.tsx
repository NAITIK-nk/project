import React, { useEffect, useRef, useState } from 'react';
import { Award, Users, Globe, Clock } from 'lucide-react';

// Local images
import casio3Image from './watchesimg/casio-3.jpg';
import omega2Image from './watchesimg/omega-2.jpg';
import seiko2Image from './watchesimg/seiko-2.jpg';
import bgwatchImage from './watchesimg/bgwatch.jpg';
/* ---------- Utilities ---------- */

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

const parseTarget = (s: string) => {
  // Supports 70+, 120+, 500+, 1M+
  const raw = s.endsWith('+') ? s.slice(0, -1) : s;
  const hasM = raw.toUpperCase().includes('M');
  const base = parseFloat(raw.replace(/[^0-9.]/g, '')) * (hasM ? 1_000_000 : 1);
  const suffix = hasM ? 'M+' : '+';
  return { num: base, suffix };
};

const formatValue = (val: number, suffix: string) => {
  if (suffix === 'M+') return `${Math.round(val / 1_000_000)}M+`;
  return `${Math.round(val).toLocaleString()}+`;
};

const useCountUp = (startWhen: boolean, targetText: string, duration = 1200) => {
  const [display, setDisplay] = useState(targetText);
  useEffect(() => {
    if (!startWhen) return;
    const { num, suffix } = parseTarget(targetText);
    let start: number | null = null;
    const from = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const current = from + eased * (num - from);
      setDisplay(formatValue(current, suffix));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [startWhen, targetText, duration]);
  return display;
};

/* ---------- Component ---------- */

const About: React.FC = () => {
  const values = [
    { icon: <Award className="h-8 w-8 text-yellow-600" />, title: 'Excellence', description: 'We pursue perfection in every detail, from movement to finishing' },
    { icon: <Clock className="h-8 w-8 text-yellow-600" />, title: 'Heritage', description: 'Over 70 years of Indian watchmaking tradition and expertise' },
    { icon: <Users className="h-8 w-8 text-yellow-600" />, title: 'Craftsmanship', description: 'Master artisans dedicated to creating exceptional timepieces' },
    { icon: <Globe className="h-8 w-8 text-yellow-600" />, title: 'Innovation', description: 'Constantly pushing boundaries while respecting tradition' },
  ];

  const stats = [
    { number: '70+', label: 'Years of Heritage' },
    { number: '120+', label: 'Countries Worldwide' },
    { number: '500+', label: 'Master Craftsmen' },
    { number: '1M+', label: 'Satisfied Customers' },
  ];

  // Reveal hooks for sections
  const hero = useInView();
  const intro = useInView();
  const valuesRef = useInView();
  const statsRef = useInView(0.25);
  const teamRef = useInView();
  const ctaRef = useInView();

  // Precompute count-up displays using hooks in fixed order (no loops/callbacks)
  const display0 = useCountUp(statsRef.inView, stats[0].number, 1200);
  const display1 = useCountUp(statsRef.inView, stats[1].number, 1400);
  const display2 = useCountUp(statsRef.inView, stats[2].number, 1600);
  const display3 = useCountUp(statsRef.inView, stats[3].number, 1800);
  const displays = [display0, display1, display2, display3];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgwatchImage})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div
          ref={hero.ref}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 transition-all duration-700"
          style={{
            opacity: hero.inView ? 1 : 0,
            transform: hero.inView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl opacity-90">Seven decades of Indian excellence and timeless craftsmanship</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div
          ref={intro.ref}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700"
          style={{
            opacity: intro.inView ? 1 : 0,
            transform: intro.inView ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-8">SAMAY — Curated Luxury Marketplace</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            SAMAY is a curated luxury watch marketplace connecting discerning collectors with authentic
            timepieces from the world's most respected brands. We partner with authorized dealers and
            trusted suppliers to ensure every watch we list is genuine and carefully vetted.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our mission is to make premium watches accessible, trustworthy, and discoverable. We focus on
            authenticity, service, and a best-in-class shopping experience for collectors and enthusiasts alike.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={valuesRef.ref}
            className="text-center mb-16 transition-all duration-700"
            style={{
              opacity: valuesRef.inView ? 1 : 0,
              transform: valuesRef.inView ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide every aspect of our craft</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex space-x-6 p-6 rounded-lg hover:bg-gray-50 transition-all duration-500"
                style={{
                  opacity: valuesRef.inView ? 1 : 0,
                  transform: valuesRef.inView ? 'translateY(0)' : 'translateY(14px)',
                  transitionDelay: `${index * 90}ms`,
                }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">{value.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats with Count-Up */}
      <section ref={statsRef.ref} className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-16 transition-all duration-700"
            style={{
              opacity: statsRef.inView ? 1 : 0,
              transform: statsRef.inView ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <h2 className="text-4xl font-bold mb-4">SAMAY by Numbers</h2>
            <p className="text-xl text-gray-300">Our impact across the globe</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const display = displays[i];
              return (
                <div
                  key={i}
                  className="text-center transition-all duration-700"
                  style={{
                    opacity: statsRef.inView ? 1 : 0,
                    transform: statsRef.inView ? 'translateY(0)' : 'translateY(12px)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">{display}</div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={teamRef.ref}
            className="text-center mb-16 transition-all duration-700"
            style={{
              opacity: teamRef.inView ? 1 : 0,
              transform: teamRef.inView ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Master Craftsmen</h2>
            <p className="text-xl text-gray-600">The artisans behind every SAMAY timepiece</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                img: casio3Image,
                title: 'Movement Assembly',
                desc: 'Our master watchmakers assemble each movement by hand, ensuring precision and reliability that lasts generations.',
              },
              
              {
                img: seiko2Image,
                title: 'Case Finishing',
                desc: 'Skilled artisans meticulously polish and finish each case, creating the perfect balance of form and function.',
              },
              
              {
                img: omega2Image,
                title: 'Quality Control',
                desc: 'Every timepiece undergoes rigorous testing and inspection to meet our exacting standards of excellence.',
              },
              
            ].map((t, i) => (
              <div
                key={t.title}
                className="text-center transition-all duration-700"
                style={{
                  opacity: teamRef.inView ? 1 : 0,
                  transform: teamRef.inView ? 'translateY(0)' : 'translateY(14px)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                  <img src={t.img} alt={t.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.title}</h3>
                <p className="text-gray-600">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-yellow-600 text-white">
        <div
          ref={ctaRef.ref}
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 transition-all duration-700"
          style={{
            opacity: ctaRef.inView ? 1 : 0,
            transform: ctaRef.inView ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <h2 className="text-4xl font-bold mb-6">Become Part of Our Legacy</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of discerning collectors who have chosen our collection for their exceptional timepieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-yellow-600 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-300">
              Explore Collection
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-yellow-600 transition-colors duration-300">
              Visit Boutique
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
