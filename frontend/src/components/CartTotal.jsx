import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full bg-white border rounded-xl shadow-sm p-6">

      <div className="mb-6">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="space-y-4 text-sm sm:text-base">

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            {currency} {subtotal}.00
          </span>
        </div>

        <hr />

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping Fee</span>
          <span className="font-medium">
            {currency} {delivery_fee}.00
          </span>
        </div>

        <hr />

        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold text-gray-800">
            Total
          </span>

          <span className="text-xl font-bold text-[#4B072B]">
            {currency} {total}.00
          </span>
        </div>

      </div>

    </div>
  );
};

export default CartTotal;