import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const handleLogin = (data) => {
    console.log(data);
  };
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-4/5 md:w-3/5 lg:w-96 border-2 rounded-xl p-7">
        <h1 className="text-xl text-center">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              required
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Your Email"
              {...register("password")}
              required
              className="input input-bordered w-full "
            />
          </div>
          <label className="label">
            <span className="label-text">
              New to Doctors Portal?
              <Link className="text-secondary">Create new Account</Link>
            </span>
          </label>
          <input
            className="btn btn-accent w-full"
            type="submit"
            value="Login"
          />
        </form>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">Continue With Google</button>
      </div>
    </div>
  );
};

export default Login;
