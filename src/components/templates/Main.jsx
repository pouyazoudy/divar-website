import React from "react";
import { sp } from "../../utils/number";

function Main({ allPosts }) {
  console.log(allPosts);

  return (
    <div className="flex flex-wrap justify-between mt-5 w-[calc(100%-200px)]">
      {allPosts.posts.map((post) => (
        <div
          key={post._id}
          className="w-[330px] flex justify-between border border-[#eaeaea] m-2.5 p-4 rounded-md ">
          <div className="flex flex-col justify">
            <p>{post.options.title}</p>
            <div className="text-gray-600 font-[0.9rem]">
              <p>{sp(post.amount)} تومان</p>
              <span>{post.options.city}</span>
            </div>
          </div>
          <img
            src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`}
            className="w-[150px] h-[130px] rounded-[3px] object-cover "
          />
        </div>
      ))}
    </div>
  );
}

export default Main;
