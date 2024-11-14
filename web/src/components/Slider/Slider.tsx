import React, { useEffect, useRef } from "react";
import "./Slider.css"; 

const cardData = [
  { id: 1, title: "Uploads got easier" },
  { id: 2, title: "Direct Admin communication", description: "" },
  { id: 3, title: "Upload subject material", description: "" },
  { id: 4, title: "Evaluation (coming soon)", description: "" },
  { id: 5, title: "CyberShelf Admin", description: "" },
];
const Slider: React.FC = () => {
    const slideRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const slider = slideRef.current;
        if(!slider) return;
        const handleScroll = () => {
            if(slider.scrollLeft >= slider.scrollWidth / 2) slider.scrollLeft = 0;
        };
        const scrollInterval = setInterval(() => {
            if(slider) slider.scrollLeft += 1;
        }, 10);
        slider.addEventListener('scroll', handleScroll);
        return () => {
            clearInterval(scrollInterval);
            slider.removeEventListener('scroll', handleScroll);
        };
    }, [])
  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        {cardData.map((card) => (
          <div key={`copy-${card.id}`} className="card">
            <h3>{card.title}</h3>
            <div className="img-div">
              <img src={`../../../image${card.id}.svg`} className="card-img" />
            </div>
          </div>
        ))}
        {cardData.map((card) => (
          <div key={`copy-${card.id}`} className="card">
            <h3>{card.title}</h3>
            <div className="img-div">
              <img src={`../../../image${card.id}.svg`} className="card-img" />
            </div>
          </div>
        ))}
        {cardData.map((card) => (
          <div key={`copy-${card.id}`} className="card">
            <h3>{card.title}</h3>
            <div className="img-div">
              <img src={`../../../image${card.id}.svg`} className="card-img" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
