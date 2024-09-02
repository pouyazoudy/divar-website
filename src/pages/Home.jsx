import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

import Sidebar from "../components/templates/Sidebar";
import Main from "../components/templates/Main";
import { getAllPosts } from "../services/user";
import Loader from "../components/modules/Loader";
import { getCategory } from "../services/admin";
import axios from "axios";

function HomePage() {
  const { categories, allPosts } = useLoaderData();

  return (
    <div className="flex">
      <Suspense fallback={<Loader />}>
        <Await resolve={categories}>
          {(loadedCategories) => <Sidebar categories={loadedCategories} />}
        </Await>
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Await resolve={allPosts}>
          {(loadedPosts) => <Main allPosts={loadedPosts} />}
        </Await>
      </Suspense>
    </div>
  );
}

export default HomePage;

async function categoriesLoader() {
  const response = await getCategory();
  return response;
}

async function allPostsLoader() {
  const response = await axios.get("http://localhost:3400/");
  return response.data;        
}

export async function loader() {
  return defer({
    categories: await categoriesLoader(),
    allPosts: allPostsLoader(),
  });
}
