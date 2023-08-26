"use client";
import axios from "axios";
import { useState, useEffect } from "react";

import { userInfo } from "@/interfaces/userInfo";

export default function Profile() {
  const [userData, setUserData] = useState<userInfo>();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get("/api/users/userprofile");
    setUserData(res.data.data);
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div>profileu</div>
      <span>{userData?.userName}</span>
    </div>
  );
}
