import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getCategory } from "../../services/admin";

function Sidebar({categories}) {
  return (
    <div className="mt-7 w-[200px]">
      <h4>دسته ها</h4>
      <ul>
        {categories?.data.map((item) => (
          <li key={item._id} className="flex my-5 mx-0">
            <img src={`../../public/${item.icon}.svg`} />
            <p className="font-extralight mr-2.5 text-gray-600">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
