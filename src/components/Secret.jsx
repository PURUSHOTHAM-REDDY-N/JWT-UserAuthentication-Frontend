import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Secret() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  
  useEffect(() => {
    const verifyUser = async () => {
      
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          process.env.REACT_APP_BACKEND_URL,
          {},
          {
            withCredentials: true,
          }
          );
          if (!data.status) {
          
          
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="private flex flex-col m-10">
        <h1 className="m-10 text-center"><b>Protected Page</b></h1>
        <button className="bg-blue-600 rounded-2xl text-white py-2" onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </>
  );
}
