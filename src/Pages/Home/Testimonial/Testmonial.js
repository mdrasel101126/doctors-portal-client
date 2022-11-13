import React from "react";
import quote from "../../../assets/icons/quote.svg";
import people1 from "../../../assets/images/people1.png";
import people2 from "../../../assets/images/people2.png";
import people3 from "../../../assets/images/people3.png";
import Review from "./Review";

const Testmonial = () => {
  const reviews = [
    {
      _id: 1,
      name: "Winson Herry",
      image: people1,
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
    },
    {
      _id: 2,
      name: "Winson Herry",
      image: people2,
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
    },
    {
      _id: 3,
      name: "Winson Herry",
      image: people3,
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
    },
  ];
  return (
    <section className="mt-10">
      <div className="flex justify-between">
        <div>
          <h4 className="text-xl text-primary font-bold">Testimonial</h4>
          <h2 className="text-4xl">What Our Patients Says</h2>
        </div>
        <div>
          <figure>
            <img className="w-24 lg:w-48" src={quote} alt="" />
          </figure>
        </div>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((rev) => (
          <Review key={rev._id} rev={rev}></Review>
        ))}
      </div>
    </section>
  );
};

export default Testmonial;
