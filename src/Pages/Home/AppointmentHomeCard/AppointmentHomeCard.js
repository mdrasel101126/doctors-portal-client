import React from "react";
import doctor from "../../../assets/images/doctor.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import appointmentBG from "../../../assets/images/appointment.png";

const AppointmentHomeCard = () => {
  return (
    <section
      className="mt-36"
      style={{
        background: `url(${appointmentBG})`,
      }}
    >
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={doctor}
            className="-mt-36 hidden md:block lg:w-1/2 rounded-lg "
            alt=""
          />
          <div>
            <h4 className="text-primary text-xl">Appointment</h4>
            <h3 className="text-2xl text-white">Make an appointment Today</h3>
            <p className="py-6 text-white">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <PrimaryButton>Make Appointment</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentHomeCard;
