import { format } from "date-fns";
import React from "react";

const BookingModal = ({ treatment, selectedDate }) => {
  const { name, slots } = treatment;
  const date = selectedDate ? format(selectedDate, "PP") : null;
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const booking = {
      appointmentDate: date,
      name,
      email,
      phone,
      slot,
    };
    console.log(date, slot, name, email, phone);
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid gap-4 grid-cols-1 mt-6"
          >
            <input
              type="text"
              placeholder="Type here"
              name="date"
              value={date ? date : "Please Select a Date"}
              disabled
              className="input input-bordered w-full "
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              className="input input-bordered w-full "
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              className="input input-bordered w-full "
            />
            <input
              type="text"
              placeholder="Your Phone"
              name="phone"
              className="input input-bordered w-full "
            />
            <input
              type="submit"
              className="btn w-full bg-accent text-white"
              value="SUBMIT"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
