import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <section className="py-12 sm:py-16 lg:py-20">

      {/* Heading */}
      <div className="text-center mb-10 lg:mb-14">

        <Title text1={"BEST"} text2={"SELLERS"} />

        <p className="mt-4 max-w-2xl mx-auto px-4 text-sm sm:text-base text-gray-600 leading-7">
          Shop our best sellers, featuring the most-loved gifts chosen by
          thousands of happy customers.
        </p>

      </div>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>

    </section>
  );
};

export default BestSeller;