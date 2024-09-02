import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getCategory } from "../../services/admin";
import { getCookie } from "../../utils/cookies";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: null,
    city: "",
    category: "",
    images: null,
  });

  const { data } = useQuery(["get-categories"], getCategory);

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, images: event.target.files[0] });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let formItem in form) {
      formData.append(formItem, form[formItem]);
    }
    const token = getCookie("accessToken");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "Multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => toast.success(res.data.message)).catch(error => toast.error("مشکلی پیش آمده است!"));
  };

  return (
    <>
      <form onChange={changeHandler} onSubmit={submitHandler}>
        <h3 className="mb-8 border-b  border-b-[3px] border-[#a62626] w-fit pb-1 ">
          افزودن آگهی
        </h3>
        <label htmlFor="title" className="block font-[0.9rem] mb-2.5">
          عنوان
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-[300px] p-1 border border-grey-300 rounded-md mb-7"
        />
        <label htmlFor="content" className="block font-[0.9rem] mb-2.5">
          توضیحات
        </label>
        <textarea
          name="content"
          id="content"
          className="block w-[300px] h-[100px] p-1 border border-grey-300 rounded-md mb-7"
        />
        <label htmlFor="amount" className="block font-[0.9rem] mb-2.5">
          قیمت
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          className="block w-[300px] p-1 border border-grey-300 rounded-md mb-7"
        />
        <label htmlFor="city" className="block font-[0.9rem] mb-2.5">
          شهر
        </label>
        <input
          type="text"
          name="city"
          id="city"
          className="block w-[300px] p-1 border border-grey-300 rounded-md mb-7"
        />
        <label htmlFor="category" className="block font-[0.9rem] mb-2.5">
          دسته بندی
        </label>
        <select
          name="category"
          id="category"
          className="block w-[300px] p-1 border border-grey-300 rounded-md mb-7">
          {data?.data.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <label htmlFor="images" className="block font-[0.9rem] mb-2.5">
          عکس
        </label>
        <input
          type="file"
          name="images"
          id="images"
          className="block w-[300px] p-1 border border-grey-300 rounded-md mb-7"
        />
        <button
          type="submit"
          className="bg-[#a62626] text-white border-none py-2.5 px-6 rounded-md font-[0.9rem] cursor-pointer">
          ایجاد
        </button>
      </form>
    </>
  );
}

export default AddPost;
