'use client';

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const Testimonials = () => {
  const testimonialsData = [
    {
      name: 'Ahmed Khan',
      image: '/2.jpg',
      alt: 'testimonial-1',
      text: 'Nishat has been phenomenal in delivering high-quality embroidery designs. Their quick turnaround and attention to detail make them our go-to for all textile needs. Highly recommended!',
    },
    {
      name: 'Hassan Malik',
      image: '/1.jpg',
      alt: 'testimonial-2',
      text: 'Working with Nishat was a game-changer for our clothing brand. Their team&rsquo;s communication and redesign skills are top-notch. Our merchandise turned out amazing, thanks to Nishat!',
    },
    {
      name: 'Bilal Siddiqui',
      image: '/3.jpg',
      alt: 'testimonial-3',
      text: 'I&rsquo;m thrilled with Nishat&rsquo;s digitization services. They processed our complex designs in just a few hours, and the quality was outstanding. Nishat is the best in the business!',
    },
    {
      name: 'Zain Abbas',
      image: '/6.jpg',
      alt: 'testimonial-4',
      text: 'Nishat&rsquo;s embroidery digitizing is unmatched. When we sent the wrong design, their team quickly fixed it without any hassle. We&rsquo;re excited to continue working with Nishat for future projects.',
    },
    {
      name: 'Ayesha Noor',
      image: '/5.jpg',
      alt: 'testimonial-5',
      text: 'Nishat&rsquo;s team is incredible to work with. Their fast service, excellent customer support, and dedication to quality make them a trusted partner for our fashion line. Highly professional!',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-100 py-20 font-manrope">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl uppercase tracking-wide text-gray-600 animate-fade-in-up">
            Testimonials
          </h3>
          <h4 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 animate-fade-in-up [animation-delay:0.2s]">
            Customer&rsquo;s Awesome <br />
            <span className="text-gray-600">Feedback.</span>
          </h4>
        </div>

        <div className="gtco-testimonials">
          <Slider {...settings}>
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-white rounded-lg shadow-lg text-center p-6 transform transition-transform hover:scale-105">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.alt}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                  />
                  <div>
                    <h5 className="text-lg font-semibold text-gray-800">
                      {testimonial.name}
                      <br />
                      <span className="inline-flex gap-1 text-yellow-400 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </span>
                    </h5>
                    <p className="text-gray-600 mt-4">&ldquo;{testimonial.text}&rdquo;</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
