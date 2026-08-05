import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group block"
    >
      {/* Product Image */}
      <div className="overflow-hidden rounded-xl bg-gray-100">
        <img
          src={image[0]}
          alt={name}
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="mt-3">
        <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 min-h-[48px]">
          {name}
        </h3>

        <p className="mt-2 text-base font-semibold text-[#4B072B]">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;