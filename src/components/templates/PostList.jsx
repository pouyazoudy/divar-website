import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/user";

import Loader from "../modules/Loader";
import { sp } from "../../utils/number";

function PostList() {
  const { data, isLoading } = useQuery(["my-post-list"], getPosts);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h3 className="mt-12 mr-0 mb-7 border-b border-b-[3px] border-[#a62626] w-fit pb-1">
            آگهی های شما
          </h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className="flex items-center border-2 border-[#eaeaea] rounded-md my-2.5 p-1">
              <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} className="w-[100px] h-[70px] rounded-lg ml-7 object-cover "/>
              <div className="w-full">
                <p className="font-[0.9rem]">{post.options.title}</p>
                <span className="font-[0.8rem] text-gray-400">{post.options.content}</span>
              </div>
              <div className="w-[150px] text-center">
                <p className="font-[0.9rem]">{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span className="font-[0.8rem] text-gray-400">{sp(post.amount)} تومان</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default PostList;
