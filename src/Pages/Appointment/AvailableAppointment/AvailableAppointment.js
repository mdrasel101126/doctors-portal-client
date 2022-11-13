import React from "react";
import { format } from "date-fns";

const AvailableAppointment = ({ selectedDate }) => {
  return (
    <div>
      <h3 className="text-secondary text-center font-semibold">
        Available Appointments on {format(selectedDate, "PP")}
      </h3>
    </div>
  );
};

export default AvailableAppointment;
