import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useToken from "../../../useToken/useToken";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();

  if (token) {
    navigate("/");
  }

  const handleRegister = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        toast.success("Successfully Registered");
        updateProfile(data.name, data.email);
        console.log(user);
        setError("");
        reset();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  const updateProfile = (name, email) => {
    const profile = {
      displayName: name,
    };
    updateUserProfile(profile)
      .then(() => {
        //user updated successfully
        saveUserToDB(name, email);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const saveUserToDB = (name, email) => {
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedUserEmail(email);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-4/5 md:w-3/5 lg:w-96 border-2 rounded-xl p-7">
        <h1 className="text-xl text-center">Register</h1>
        <form onSubmit={handleSubmit(handleRegister)}>
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
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Your Password"
              {...register("password", {
                required: "Password is Required",
                pattern: {
                  value: /[!@#\$%\^&\*_]/,
                  message:
                    "Password should contain at least one special character",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 lenght",
                },
              })}
              className="input input-bordered w-full "
            />
            {errors.password && (
              <span role="alert" className="text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>

          <label className="label">
            <span className="label-text">
              Already Have an Account?
              <Link to="/login" className="text-secondary">
                Please Login
              </Link>
            </span>
          </label>
          <input
            className="btn btn-accent w-full"
            type="submit"
            value="Register"
          />
          {error && <p className="text-red-600">{error}</p>}
        </form>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">Continue With Google</button>
      </div>
    </div>
  );
};

export default Register;
