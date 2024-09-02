import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addCategory } from "../../services/admin";

function CategoryForm() {
    const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: queryClient.invalidateQueries("get-categories") 
  });

  const submitHandler = (event) => {
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
  };

  return (
    <>
      <form onChange={changeHandler} onSubmit={submitHandler}>
        <h3 className="mb-8 border-b-2 border-[#a62626] w-fit pb-1 ">
          دسته بندی جدید
        </h3>
        {!!error && (
          <p className="bg-[#a62626] mb-5 text-white p-1 text-center rounded-md">
            مشکلی پیش آمده است
          </p>
        )}
        {data?.status === 201 && (
          <p className="bg-[#a62626] mb-5 text-white p-1 text-center rounded-md">
            دسته بندی با موفقیت اضافه شد
          </p>
        )}
        <label htmlFor="name" className="block font-[0.9rem] mb-2.5">
          اسم دسته بندی
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="block  w-[300px] p-1 border border-gray-300 rounded-md mb-8"
        />
        <label htmlFor="slug" className="block font-[0.9rem] mb-2.5">
          اسلاگ
        </label>
        <input
          type="text"
          name="slug"
          id="slug"
          className="block  w-[300px] p-1 border border-gray-300 rounded-md mb-8"
        />
        <label htmlFor="icon" className="block font-[0.9rem] mb-2.5">
          آیکون
        </label>
        <input
          type="text"
          name="icon"
          id="icon"
          className="block  w-[300px] p-1 border border-gray-300 rounded-md mb-8"
        />
        <button
          type="submit"
          className="bg-[#a62626] text-white border-none py-2.5 px-6 rounded-md font-[0.9rem] cursor-pointer disabled:opacity-50"
          disabled={isLoading}>
          ایجاد
        </button>
      </form>
    </>
  );
}

export default CategoryForm;
