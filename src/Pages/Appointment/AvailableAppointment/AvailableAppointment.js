import React, { useState } from "react";
import { format } from "date-fns";
import AppointmentOption from "./AppointmentOption";
import BookingModal from "../BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const AvailableAppointment = ({ selectedDate }) => {
  const date = format(selectedDate, "PP");
  const [treatment, setTreatment] = useState(null);
  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: () =>
      fetch(`http://localhost:5000/appointmentOptions?date=${date}`).then(
        (res) => res.json()
      ),
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="my-16">
      {selectedDate && (
        <h3 className="text-secondary text-center font-semibold">
          Available Appointments on {format(selectedDate, "PP")}
        </h3>
      )}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {appointmentOptions?.map((option) => (
          <AppointmentOption
            key={option._id}
            appointmentOption={option}
            setTreatment={setTreatment}
          ></AppointmentOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          treatment={treatment}
          selectedDate={selectedDate}
          setTreatment={setTreatment}
          refetch={refetch}
        ></BookingModal>
      )}
    </section>
  );
};

export default AvailableAppointment;
