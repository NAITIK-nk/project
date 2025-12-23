import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Diamond, Globe } from 'lucide-react';

// Import local images using relative paths
import SAMAYClassicLogo from './watchesimg/volexx.png'; // Assuming you will rename this file appropriately
import roseGoldLogo from './watchesimg/rosegold.png';

// Reusable component for the story paragraphs
const StoryParagraph = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <div className="story-paragraph">
      <h3 className="story-title">{title}</h3>
      <p className="story-body">{children}</p>
    </div>
  );
};


const Brands: React.FC = () => {
  const brandLogos = [
    {
      name: 'SAMAY',
      logo: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Indian precision since 2024'
    },
    {
      name: 'SAMAY SPORT',
      logo: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Performance meets elegance'
    },
    {
      name: 'SAMAY CLASSIC',
      logo: SAMAYClassicLogo,
      description: 'Timeless traditional craftsmanship'
    },
    {
      name: 'SAMAY LUXURY',
      logo: 'https://images.pexels.com/photos/1697215/pexels-photo-1697215.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Ultimate luxury timepieces'
    }
  ];

  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: 'Indian Made Excellence',
      description: 'Every SAMAY timepiece is crafted in India following the highest standards of quality and precision.'
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-500" />,
      title: '20+ Years of Craftsmanship Expertise',
      description: 'Founded by master watchmakers with decades of experience in haute horlogerie.'
    },
    {
      icon: <Diamond className="h-8 w-8 text-yellow-500" />,
      title: 'Premium Materials',
      description: 'We use only the finest materials including 18K gold, platinum, and ethically sourced diamonds.'
    },
    {
      icon: <Globe className="h-8 w-8 text-yellow-500" />,
      title: 'Global Presence',
      description: 'SAMAY boutiques and authorized dealers in over 120 countries worldwide.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* CSS Styles for the paragraph design */}
      <style>{`
        .story-paragraph {
          background-color: #ffffff;
          border-radius: 0.75rem;
          padding: 1.5rem;
          border-left: 4px solid #facc15;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .story-paragraph:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
        .story-title {
          color: #ca8a04;
          font-weight: 600;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .story-body {
          color: #4b5563;
          line-height: 1.6;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Our Brand Heritage</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Since 2024, SAMAY has been synonymous with Indian excellence, precision engineering, and timeless elegance. 
            Our commitment to craftsmanship and innovation has made us one of the world's most respected luxury watch manufacturers.
          </p>
        </motion.div>

        {/* Brand Collections */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brandLogos.map((brand, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h3>
                    <p className="text-gray-600">{brand.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Brand Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">The SAMAY Story</h2>
              <StoryParagraph title="The Genesis">
                Founded in 2024 by a master watchmaker in the heart of Geneva, SAMAY began as a small 
                atelier dedicated to creating exceptional timepieces for discerning collectors.
              </StoryParagraph>
              <StoryParagraph title="The Philosophy">
                Our commitment to Indian excellence and innovative design has earned us recognition as one of the 
                world's premier luxury watch manufacturers. Each SAMAY timepiece represents the perfect fusion 
                of traditional craftsmanship and cutting-edge technology.
              </StoryParagraph>
              <StoryParagraph title="The Future">
                Today, SAMAY continues to push the boundaries of horological excellence, creating watches that 
                are not just instruments of time, but works of art that will be treasured for generations.
              </StoryParagraph>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="SAMAY Heritage"
                className="w-full rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="bg-white rounded-2xl p-8 md:p-12 mb-20 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose SAMAY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="flex space-x-6 items-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center shadow-md">
                    {achievement.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Craftsmanship Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">A Legacy of Craftsmanship</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every SAMAY watch is assembled by hand by our master craftsmen in our Geneva manufactory, 
              ensuring each timepiece meets our exacting standards of excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square mb-6 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Movement Assembly"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Movement Assembly</h3>
              <p className="text-gray-600">Precision engineering of our in-house mechanical movements.</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square mb-6 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/1034064/pexels-photo-1034064.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Case Finishing"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Case Finishing</h3>
              <p className="text-gray-600">Meticulous polishing and finishing of precious metal cases.</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square mb-6 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={roseGoldLogo}
                  alt="Quality Control"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Control</h3>
              <p className="text-gray-600">Rigorous testing and inspection of every timepiece.</p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Brands;
