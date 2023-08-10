import React from 'react';
import Slider from 'react-slick';



const Carousel = ({ Card, posts }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Adjust based on screen size
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {posts.map((post, index) => (
        <Card
          key={post.slug}
          title={post.title}
          date={post.date}
          imageSrc={post.imageSrc}
          slug={post.slug}
        />
      ))}
    </Slider>
  );
};


export default Carousel;
