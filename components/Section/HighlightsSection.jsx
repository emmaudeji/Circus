
import FeatureHighlight from './FeatureHighLight';
import UserTestimonial from './UserTestimonial';
import { featureHighlights } from '@/data/featureHighlights';
import { userTestimonials } from '@/data/userTestimonials';

import Slider from 'react-slick';


const HighlightsSection = () => {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Our App</h2>
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/2">
            <div className="space-y-6">
              {featureHighlights.map((feature, index) => (
                <FeatureHighlight
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
          <div className="md:w-1/2 sm:px-14">
            <Slider {...sliderSettings}>
              {userTestimonials.map((testimonial, index) => (
                <UserTestimonial
                  key={index}
                  imageSrc={testimonial.imageSrc}
                  name={testimonial.name}
                  testimonial={testimonial.testimonial}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
