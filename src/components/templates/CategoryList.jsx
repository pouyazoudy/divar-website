import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/admin";
import Loader from "../modules/Loader";

function CategoryList() {
  const { data, isLoading } = useQuery(["get-categories"], getCategory);

  return (
    <div className="m-12 mr-0 mb-[70px]">
      {isLoading ? (
        <Loader />
      ) : (
        data?.data.map((item) => (
          <div key={item._id} className="flex my-5 mx-0 p-4 border-2 border-[#eaeaea] rounded-md ">
            <img src={`../../public/${item.icon}.svg`} alt={`${item.name}`} />
            <h5 className="mr-2.5 font-[0.9rem] w-[120px]">{item.name}</h5>
            <p className="w-full text-left text-[#a62626]">slug: {item.slug}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
