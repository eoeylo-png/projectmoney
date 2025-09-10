import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How much compensation can I get?',
    answer: 'You can receive between €250-€600 per passenger depending on the flight distance and delay duration. Short flights (up to 1,500km) delayed 3+ hours qualify for €250, medium flights (1,500-3,500km) for €400, and long flights (over 3,500km) delayed 4+ hours for €600.'
  },
  {
    question: 'How long does the process take?',
    answer: 'Most cases are resolved within 2-8 weeks. However, some complex cases involving uncooperative airlines may take longer. We keep you updated throughout the entire process and handle all communication with the airline.'
  },
  {
    question: 'What if my flight was delayed due to bad weather?',
    answer: 'Weather-related delays are considered "extraordinary circumstances" and typically don\'t qualify for compensation. However, if the airline didn\'t provide proper care (meals, accommodation) during extended weather delays, you may still be entitled to reimbursement for expenses.'
  },
  {
    question: 'How far back can I claim?',
    answer: 'You can claim compensation for flights up to 3 years back in most European countries. The exact time limit varies by country, but we can help you determine if your flight is still eligible for compensation.'
  },
  {
    question: 'What is your success rate?',
    answer: 'We have a 98% success rate for eligible claims. Our legal experts know airline regulations inside and out, and we only take on cases we believe we can win. If we don\'t win your case, you don\'t pay anything.'
  },
  {
    question: 'How much do you charge?',
    answer: 'We work on a "no win, no fee" basis and only charge a commission if we successfully get your compensation. Our fee is 25% + VAT of the compensation amount, which means you keep the majority of your compensation with no upfront costs.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about flight compensation
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            Contact Our Support Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;