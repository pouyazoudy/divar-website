import React from "react";
import { SendOtp } from "../../services/auth";
import { p2e } from "../../utils/number";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const submitHandler = async (event) => {
    event.preventDefault();

    const validateMobile = /^(09\d{9}|0\d{2,3}\d{7,8})$/.test(mobile);

    const { response, error } = await SendOtp(p2e(mobile));

    if (response) setStep(2);
    if (error) console.log(error.response.data.message);
  };
  return (
    <>
      <form
        onSubmit={submitHandler}
        className="max-w-[500px] m-auto flex flex-col mt-40 border border-gray-300 rounded-md p-8 ">
        <p className="text-lg font-normal mb-5">ورود به حساب کاربری</p>
        <span className="text-gray-600 text-[0.9rem] mb-5">
          برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید،کد
          تایید به این شماره پیامک خواهد شد.
        </span>
        <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
        <input
          type="text"
          id="input"
          placeholder="شماره موبایل"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          className="mt-2.5 mr-0 mb-5 p-1 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-28 py-1 px-2.5 border-none bg-[#a62626] text-white rounded-md cursor-pointer p-1">
          ارسال کد تایید
        </button>
      </form>
    </>
  );
}

export default SendOtpForm;
