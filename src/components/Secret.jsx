import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Secret() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [profile,setProfile]=useState(null)


  useEffect(()=>{
    
  },[])
  
  useEffect(() => {

    const data = localStorage.getItem('fbdata')
    setProfile(JSON.parse(data))
    console.log('this is profile ', profile)
    const verifyUser = async () => {
      
      if (!data) {
        navigate("/login");
      } else {
        console.log("inside secret js")
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/`,
          {},
          {
            withCredentials: true,
          }
          );
          if (!data.status) {
          console.log("inside server status status")
          removeCookie("jwt",{path:'/'});
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    console.log("remove cookie with path")
    removeCookie("jwt",{path:'/'},{domain:".purushotham.dev"});
    console.log("inside remove cookie");
    navigate("/login");
  };
  return (
    <>
      <div className="private flex flex-col m-10">
        <h1 className="m-10 text-center"><b>Protected Page</b></h1>
        <h1 className="m-10 text-center"><b>Welocome {profile?.first_name}</b></h1>
        <img href={profile?.picture.data.url} />
        <button className="bg-blue-600 rounded-2xl text-white py-2" onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </>
  );
}
