import React, { useState } from "react";
import {  FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  //stores inputs
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  //handle inputs

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  //loading bar
  const [progress, setProgress] = useState(0);

  //navigation
  const navigate = useNavigate();

  // error handling

  const generateError = (err) => toast.error(err);

  //handling submit

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProgress(30);

    try {
      const { data } = await axios.post(
        "http://localhost:503/api/auth/register",
        {
          ...values,
        },
        { withCredentials: true }
      );

      if (data) {
        if(data.errors){

          const { email, password, username } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
          else if (username) generateError(username);
        }
      else{
         navigate("/");
      }
    

      setProgress(100);
    }
  } catch (error) {
    generateError(error);
  }
}

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* Same as */}
      <ToastContainer />
      <section className="bg-gray-50 min-h-screen flex items-center justify-center ">
        {/* Register container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
          {/* form */}
          <div className="md:w-1/2 px-8 ">
            <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              Your data will be safe with us
            </p>
            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => handleSubmit(event)}
            >
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="username"
                placeholder="User Name"
                value={values.username}
                onChange={(event) => handleChange(event)}
              />
              <input
                className="p-2 rounded-xl border "
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                required
                onChange={(event) => handleChange(event)}
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  value={values.password}
                  autoComplete="on"
                  required
                  onChange={(event) => handleChange(event)}
                />
                <FaRegEye className="absolute top-2 right-3 translate-y-1/2 " />
              </div>
              <button className="bg-[#002D74] rounded-xl hover:scale-105 duration-300 text-white py-2">
                Register
              </button>
            </form>
            <div className="mt-10 grid grid-cols-3 items-center ">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>
            <button className="bg-white hover:scale-105 duration-300 border py-2 w-full flex justify-center items-center rounded-xl mt-5 text-sm ">
              <FcGoogle className="mr-3 w-7 h-1/2" /> Register With Google
            </button>

            <div className="mt-10 text-xs border-b border-gray-400 py-4">
              Forgot your password?
            </div>
            <div className=" mt-3 text-sm flex justify-between items-center">
              <p>If you Already have account..</p>

              <Link to="/login">
                <button className="py-2 px-5 ml-2 bg-white border rounded-xl hover:scale-110 duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>
          {/* image */}
          <div className="w-1/2 md:block hidden ">
            <img
              className=" rounded-2xl"
              src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}

