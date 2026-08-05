import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className="border-t pt-8 sm:pt-12 lg:pt-16">

      <div className="mb-8 text-center sm:text-left">
        <Title text1={'YOUR'} text2={'CART'} />
        {cartData.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">
              Your cart is empty
            </h2>

            <p className="mt-3 text-gray-500">
              Looks like you haven't added anything yet.
            </p>

            <button
              onClick={() => navigate("/collection")}
              className="mt-6 bg-[#4B072B] text-[#ffddd2] px-8 py-3 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[4fr_1fr_auto] gap-6 items-center py-6 border-b">
                <div className="flex gap-4 sm:gap-6">
                  <img className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border" src={productData.image[0]} alt="" />
                  <div>
                    <p className="text-sm sm:text-lg font-semibold text-gray-800">{productData.name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <p>{currency}{productData.price}</p>
                      {item.size !== "default" && (
                          <p className="px-3 py-1 rounded-md bg-gray-100 border text-sm">
                              {item.size}
                          </p>
                      )}
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className="w-20 rounded-md border px-3 py-2 text-center" type="number" min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className="w-5 h-5 cursor-pointer hover:scale-110 transition" src={assets.bin_icon} alt="" />
              </div>
            )

          })
        }
      </div>

      <div className="flex justify-center lg:justify-end mt-12 mb-16">
        <div className="w-full max-w-md">
          <CartTotal />
          <div className=' w-full text-end'>
            <button onClick={() => navigate('/place-order')} className="w-full sm:w-auto bg-[#4B072B] text-[#ffddd2] px-10 py-4 rounded-lg font-medium transition hover:bg-[#64103c]">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
