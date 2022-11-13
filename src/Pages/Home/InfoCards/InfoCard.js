import React from "react";

const InfoCard = ({ card }) => {
  const { name, image, bgColor, description } = card;
  return (
    <div
      className={`text-white px-6 card md:card-side bg-base-100 shadow-xl ${bgColor}`}
    >
      <figure>
        <img src={image} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
