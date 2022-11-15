import React from "react";
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
import InfoCard from "./InfoCard";

const InfoCards = () => {
  const cards = [
    {
      id: 1,
      name: "Opening Hours",
      image: clock,
      description: "Opening at 9.00 am to 10.00 pm",
      bgColor: "bg-gradient-to-r from-primary to-secondary",
    },
    {
      id: 2,
      name: "Visit our location",
      image: marker,
      description: "Brooklyn, NY 10036, United States",
      bgColor: "bg-black",
    },
    {
      id: 3,
      name: "Contact us now",
      image: phone,
      description: "+000 123 456789",
      bgColor: "bg-gradient-to-r from-primary to-secondary",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
      {cards.map((card) => (
        <InfoCard key={card.id} card={card}></InfoCard>
      ))}
    </div>
  );
};

export default InfoCards;
