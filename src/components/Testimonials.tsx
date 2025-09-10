import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'London, UK',
    amount: '€600',
    rating: 5,
    text: 'My flight was cancelled and I had no idea I could get compensation. AirHelp made the whole process so easy and I got €600 back!',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Michael Chen',
    location: 'Berlin, Germany',
    amount: '€400',
    rating: 5,
    text: 'Delayed for 5 hours with no proper explanation. AirHelp handled everything and I received my compensation within weeks.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    name: 'Emma Rodriguez',
    location: 'Madrid, Spain',
    amount: '€250',
    rating: 5,
    text: 'Professional service and great communication throughout. They really know airline law and got me the compensation I deserved.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            What our customers say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Over 16 million passengers have trusted us to get their flight compensation. Here's what they say:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
                <div className="ml-auto">
                  <div className="text-lg font-bold text-green-600">{testimonial.amount}</div>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <div className="relative">
                <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-green-50 px-6 py-3 rounded-full">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-700 font-semibold">4.9/5 based on 50,000+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;