import React, { useState, useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import MyImage from '../assets/authimage.webp';
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

export default function Login() {

  const [profile,setProfile]=useState(null)

  const maxAge=3*24*60*60;

  const [cookies, setCookie] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  //stores inputs
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  //loading bar
  const [progress, setProgress] = useState(0);

  //handle inputs

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  //showing errors

  const generateError = (err) => toast.error(err);

  //handling submit

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProgress(30);

    // sending data to the backend server in the form of request .
    //and getting response from the server in the form of response

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/login`,
      {
        ...values,
      },
      { withCredentials: true }
    );

    if (data) {

      if (data.errors) {
        const { email, password } = data.errors;
        if (email) generateError(email);
        else if (password) generateError(password);
        setProgress(100);
      }
     else {
      setCookie('jwt',data.jwt,{
        withCredentials:true,
          httpOnly:false,
          maxAge:maxAge*1000
      })
      setProgress(100);
      navigate("/");
    }
  }
  };

  const handleFBLofin = (response)=>{
    if(response.data){
      setCookie('jwt',response.data?.accessToken,{
        withCredentials:true,
          httpOnly:false,
          maxAge:maxAge*1000
      })
      localStorage.setItem('fbdata',JSON.stringify(response.data))
      setProfile(response.data)
      navigate("/");
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
            <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              Your data will be safe with us
            </p>
            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => handleSubmit(event)}
            >
              <input
                className="p-2 mt-8 rounded-xl border "
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
                  placeholder="Password"
                  value={values.password}
                  autoComplete="on"
                  required
                  onChange={(event) => handleChange(event)}
                />
                <FaRegEye className="absolute top-2 right-3 translate-y-1/2 " />
              </div>
              <button className="bg-[#002D74] rounded-xl hover:scale-105 duration-300 text-white py-2">
                Login
              </button>
            </form>
            <div className="mt-10 grid grid-cols-3 items-center ">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>
            <button className="bg-white hover:scale-105 duration-300 border py-2 w-full flex justify-center items-center rounded-xl mt-5 text-sm ">
              <FcGoogle className="mr-3 w-7 h-1/2" /> Login With Google
            </button>
            <LoginSocialFacebook
            appId="678853731118344" onResolve={(response)=>{handleFBLofin(response)}} onReject={(error)=>{console.log(error)}}>
            <FacebookLoginButton/>
            </LoginSocialFacebook>
            

            <div className="mt-10 text-xs border-b border-gray-400 py-4">
              Forgot your password?
            </div>
            <div className=" mt-3 text-sm flex justify-between items-center">
              <p>If you Don't have account..</p>

              <Link to="/register">
                <button className="py-2 px-5 ml-2 bg-white border rounded-xl hover:scale-110 duration-300">
                  Register
                </button>
              </Link>
            </div>
          </div>
          {/* image */}
          <div className="w-1/2 md:block hidden ">
            <img
              className=" rounded-2xl"
              src={MyImage}
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}
