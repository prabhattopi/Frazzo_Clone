import React, { useState, useEffect } from "react";
import "./BestDeals.css";
import Slider from "react-slick";
import { settings } from "../CommonSlider";
import {  useSelector } from "react-redux";
import ProductCard from "../../ProductCard/ProductCard";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";

const BestDeals = () => {
  const data = useSelector((state) =>
    state.product.data.filter((el) => el.tag === "best")
  );

  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <MdOutlineArrowForwardIos size={20} />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <MdOutlineArrowBackIosNew size={20} />
      </div>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="best_deals">
      <h2 className="best_deals_heading">BEST DEALS</h2>
      <div className="best_deals_slider">
        {data !== null && (
          <Slider {...settings}>
            {data.map((ele) => (
              <ProductCard key={ele} prod={ele} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
