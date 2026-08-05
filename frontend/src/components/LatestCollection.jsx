import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="py-12 sm:py-16 lg:py-20">

      {/* Heading */}
      <div className="text-center mb-10 lg:mb-14">

        <Title text1={"LATEST"} text2={"COLLECTIONS"} />

        <p className="mt-4 max-w-2xl mx-auto px-4 text-sm sm:text-base text-gray-600 leading-7">
          Explore the newest arrivals at Charis and find unique gifts that
          make every celebration unforgettable.
        </p>

      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

    </section>
  );
};

export default LatestCollection;