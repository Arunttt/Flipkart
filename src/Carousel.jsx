import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Carousel } from 'react-bootstrap';

function MyCarousel() {
  return (
    <Carousel className="border-[11px] border-solid border-[#f1f1f1]">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="image.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First Slide</h3>
          <p>This is the first slide description.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="image3.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second Slide</h3>
          <p>This is the second slide description.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="image2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third Slide</h3>
          <p>This is the third slide description.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
