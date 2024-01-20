import React, { useEffect,useState } from 'react'

export default function Home() {
  const [profile,setProfile]=useState(null)

  useEffect(()=>{
    const data = localStorage.getItem('fbdata')
    setProfile(JSON.parse(data))
    console.log('this is profile ', profile)
  },[])
  return (
    <>
    
    <div>Home</div>
    <div>welcone {profile.first_name}</div>
    </>
    
  )
}
