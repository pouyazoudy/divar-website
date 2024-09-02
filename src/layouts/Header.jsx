import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearCookie } from "../utils/cookies";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";

function Header() {
  const navigate = useNavigate();

  const { data, refetch } = useQuery(["profile"], getProfile);

  const logoutHandler = () => {
    clearCookie("accessToken");
    clearCookie("refreshToken");
    refetch();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center border-b-2 py-2.5 px-0 mb-5">
      <div className="flex">
        <Link to={"/"}>
          <img src="/divar.svg" alt="divar-logo" className="w-11 ml-10" />
        </Link>
        <span className="flex items-center text-gray-600 h-12 cursor-pointer">
          <img src="/location.svg" alt="your-location" />
          <p className="mr-1 text-[0.9rem]">تهران</p>
        </span>
      </div>
      <div className="flex">
        {data && (
          <button
            onClick={logoutHandler}
            className="bg-[#a62626] text-white h-10 w-20 leading-10 text-center rounded-md">
            خروج
          </button>
        )}
        <Link to={"/dashboard"}>
          <span className="flex items-center text-gray-600 h-12 mx-10">
            <img src="/profile.svg" alt="profile" />
            <p className="mr-1 text-[0.9rem]">دیوار من</p>
          </span>
        </Link>
        <Link
          to={ data ? "addpost" : "/auth"}
          className="bg-[#a62626] text-white h-10 w-20 leading-10 text-center rounded-md">
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
