'use client';

import {useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I place an order?',
      answer:
        "Click the 'Shop' navlink on the navigation bar, select items and add them to your cart, then proceed to checkout to complete your purchase.",
    },
    {
      question: 'What sizes are available?',
      answer:
        'Sizes range from XS to XXL for adults and 2-12 years for kids. Check the size chart on the product page.',
    },
    {
      question: 'How do I apply the 10% discount?',
      answer: 'The discount is automatically applied at checkout.',
    },
    {
      question: 'Can I track my order?',
      answer:
        'Yes, you’ll receive a tracking link via email after order confirmation.',
    },
    {
      question: 'Do you have sales or promotions?',
      answer:
        'Yes, currently a 10% discount on all items, with seasonal sales announced in the promotions section.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-20 font-manrope ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl  text-center text-gray-800 mb-8 font-semibold">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left bg-black text-white hover:bg-gray-900 transition-colors duration-200"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`p-4 bg-gray-50 text-gray-700 transition-all duration-200 ${
                  openIndex === index ? 'block' : 'hidden'
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 mt-8">
          Have more questions?{' '}
          <a
            href="mailto:support@nishat.pk"
            className="text-blue-600 hover:underline"
          >
           
          </a>{' '}
          use our live chat.
        </p>
      </div>
    </section>
  );
}