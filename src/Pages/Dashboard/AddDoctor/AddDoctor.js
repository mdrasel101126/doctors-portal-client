import { map } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  //console.log(imageHostKey);
  const navigate = useNavigate();
  const { data: specialities, isLoading } = useQuery({
    queryKey: ["specialities"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/appointmentSpeciality");
      const data = await res.json();
      return data;
    },
  });

  const handleAddDoctor = (data) => {
    //console.log(data);
    const image = data.image[0];
    //console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const doctor = {
            name: data.name,
            email: data.email,
            speciality: data.speciality,
            image: imgData.data.url,
          };
          //save doctor infomartion to the database
          fetch("http://localhost:5000/doctors", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem(
                "doctorAccessToken"
              )}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.acknowledged) {
                console.log(result);
                toast.success(`${data.name} is added successfully`);
                navigate("/dashboard/managedoctors");
              }
            });
        }
      });
  };
  return (
    <div className=" w-4/5 md:w-3/5 lg:w-96 border-2 rounded-xl p-7">
      <h1 className="text-3xl">Add A doctor</h1>
      <form onSubmit={handleSubmit(handleAddDoctor)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name is Required" })}
            className="input input-bordered w-full "
          />
          {errors.name && (
            <span role="alert" className="text-red-600">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: "Email is Required" })}
            className="input input-bordered w-full "
          />
          {errors.email && (
            <span role="alert" className="text-red-600">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Speciality</span>
          </label>
          <select
            {...register("speciality", { required: "Speciality is Required" })}
            className="select select-bordered w-full "
          >
            {specialities?.map((speciality) => (
              <option key={speciality._id} className="">
                {speciality.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("image", { required: "Photo is Required" })}
            className="input input-bordered w-full "
          />
          {errors.email && (
            <span role="alert" className="text-red-600">
              {errors.email.message}
            </span>
          )}
        </div>

        <input
          className="btn btn-accent w-full mt-3"
          type="submit"
          value="Add Doctor"
        />
        {/* {error && <p className="text-red-600">{error}</p>} */}
      </form>
    </div>
  );
};

export default AddDoctor;

/* 
Three places to store images
1.third party image hosting server
2.file system of your server
3.mongodb

*/
