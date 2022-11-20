import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/bookings?email=${user?.email}`;
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("doctorAccessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  /* if (isLoading) {
    return <Loading></Loading>;
  } */
  // console.log(bookings);
  return (
    <div>
      <h1 className="text-3xl">My appointment</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <th>{booking.patientName}</th>
                <td>{booking.treatmentName}</td>
                <td>{booking.appointmentDate}</td>
                <td>{booking.slot}</td>
                <td>
                  {booking.price && !booking.paid && (
                    <Link to={`/dashboard/payment/${booking._id}`}>
                      <button className="btn btn-primary btn-sm">Pay</button>
                    </Link>
                  )}
                  {booking.price && booking.paid && (
                    <span className="text-primary">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
