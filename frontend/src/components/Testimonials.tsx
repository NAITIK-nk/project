import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'James Wellington',
      title: 'CEO, Wellington Enterprises',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'My SAMAY Prestige Gold is more than just a timepiece—it\'s a statement of excellence. The craftsmanship is absolutely extraordinary, and the attention to detail is unmatched.',
      location: 'New York, USA'
    },
    {
      id: 2,
      name: 'Sofia Rodriguez',
      title: 'Fashion Designer',
      image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'I\'ve owned luxury watches from many brands, but SAMAY stands apart. The elegance and precision of my Classic Steel model perfectly complement my professional style.',
      location: 'Madrid, Spain'
    },
    {
      id: 3,
      name: 'Alexander Chen',
      title: 'Investment Banker',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'The SAMAY Diamond Elite is a masterpiece. Every detail reflects the brand\'s commitment to luxury and innovation. It\'s an investment in both style and heritage.',
      location: 'Hong Kong'
    },
    {
      id: 4,
      name: 'Isabella Thompson',
      title: 'Art Collector',
      image: 'https://images.pexels.com/photos/1043475/pexels-photo-1043475.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'My SAMAY Midnight Black is a work of art on my wrist. The Swiss movement is incredibly precise, and the customer service has been exceptional throughout my ownership.',
      location: 'London, UK'
    },
    {
      id: 5,
      name: 'David Martinez',
      title: 'Tech Entrepreneur',
      image: 'https://images.pexels.com/photos/1043476/pexels-photo-1043476.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'SAMAY combines traditional craftsmanship with modern innovation perfectly. My Ocean Blue model has been my daily companion for three years, and it still looks pristine.',
      location: 'San Francisco, USA'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentReview = testimonials[currentTestimonial];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover why discerning collectors worldwide trust SAMAY for their luxury timepiece needs.
        </p>
      </div>

      <div className="relative">
        {/* Main Testimonial */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-4 right-4 text-yellow-600 opacity-20">
            <Quote className="h-16 w-16" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Client Image */}
            <div className="text-center lg:text-left">
              <div className="w-32 h-32 mx-auto lg:mx-0 rounded-full overflow-hidden shadow-lg mb-4">
                <img
                  src={currentReview.image}
                  alt={currentReview.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{currentReview.name}</h3>
                <p className="text-gray-600 font-medium">{currentReview.title}</p>
                <p className="text-gray-500 text-sm">{currentReview.location}</p>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-center lg:justify-start space-x-1 mb-6">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed italic">
                "{currentReview.text}"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevTestimonial}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-yellow-600 transition-colors" />
          </button>
          <button
            onClick={nextTestimonial}
            className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-yellow-600 transition-colors" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-yellow-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">98%</div>
          <div className="text-gray-600">Customer Satisfaction</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">50K+</div>
          <div className="text-gray-600">Happy Customers</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">4.9/5</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">70+</div>
          <div className="text-gray-600">Years of Excellence</div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;