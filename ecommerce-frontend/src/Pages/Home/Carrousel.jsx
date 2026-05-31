import './Carrousel.css';
import { slides } from './imageData.json';
import { useState } from 'react';



export function Carrousel({ prodImage }) {



  const data = [
    { src: prodImage },
    ...slides
  ];
  const [slide, setSlide] = useState(0);
  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      
     
      {data.map((item, idx) => {
        if ((item.src).endsWith('.mp4')) {
          return (<video src={item.src}
            key={idx} controls="controls" autoPlay muted loop
            className={slide === idx ? "slide" : "slide slide-hidden"}></video>);
        }
        return (
          <img
            src={item.src}
            key={idx}
            className={slide === idx ? "slide" : "slide slide-hidden"}
          />
        );
      })}
       <button onClick={prevSlide} className="arro arrow-left" >&#10094;</button>
      <button
        onClick={nextSlide}
        className="arro arrow-right">&#10095;</button>
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
}