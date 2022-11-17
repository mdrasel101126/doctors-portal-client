import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useToken from "../../../useToken/useToken";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { loginUser } = useContext(AuthContext);
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);

  if (token) {
    navigate(from, { replace: true });
  }
  const handleLogin = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        setError("");
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
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
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Your Password"
              {...register("password")}
              className="input input-bordered w-full "
            />
          </div>
          <label className="label">
            <span className="label-text">
              New to Doctors Portal?
              <Link to="/register" className="text-secondary">
                Create new Account
              </Link>
            </span>
          </label>
          <input
            className="btn btn-accent w-full"
            type="submit"
            value="Login"
          />
          {error && <p className="text-red-600">{error}</p>}
        </form>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">Continue With Google</button>
      </div>
    </div>
  );
};

export default Login;
