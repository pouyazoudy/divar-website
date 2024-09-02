import React from "react";
import { checkOtp } from "../../services/auth";
import { setCookies } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../services/user";

function CheckOtpForm({ code, setCode, setStep, mobile }) {
  const navigate = useNavigate();

  const { refetch } = useQuery(["profile"], getProfile);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return;

    const { response, error } = await checkOtp(code, mobile);

    if (response) {
      setCookies(response.data);
      navigate("/");
      refetch();
    }

    if (error) console.log(error.response.data.message);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="max-w-[500px] m-auto flex flex-col mt-40 border border-gray-300 rounded-md p-8">
      <p className="text-lg font-normal mb-5">تایید کد اس ام اس شده</p>
      <span className="text-gray-600 text-[0.9rem] mb-5">
        کد پیامک شده به شماره «{mobile}» را وارد کنید.{" "}
      </span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        className="mt-2.5 mr-0 mb-5 p-1 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-28 py-1 px-2.5 border-none bg-[#a62626] text-white rounded-md cursor-pointer p-1">
        ورود
      </button>
      <button
        onClick={() => setStep(1)}
        className="bg-white text-[#a62626] border border-[#a62626] w-[150px] rounded-md mt-7 p-1">
        تغییر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;
