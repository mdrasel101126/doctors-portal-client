import React from "react";
import AppointmentHomeCard from "../AppointmentHomeCard/AppointmentHomeCard";
import Banner from "../Banner/Banner";
import InfoCards from "../InfoCards/InfoCards";
import Services from "../Services/Services";
import Testmonial from "../Testimonial/Testmonial";

const Home = () => {
  return (
    <div className="mx-5">
      <Banner></Banner>
      <InfoCards></InfoCards>
      <Services></Services>
      <AppointmentHomeCard></AppointmentHomeCard>
      <Testmonial></Testmonial>
    </div>
  );
};

export default Home;
