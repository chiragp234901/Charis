import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, currency, navigate } = useContext(ShopContext);

  const [orderData,setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className="border-t pt-8 sm:pt-12 lg:pt-16">

        <div className="mb-8 text-center sm:text-left">
            <Title text1={'MY'} text2={'ORDERS'}/>
            {orderData.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-700">
                No Orders Yet
              </h2>

              <p className="mt-3 text-gray-500">
                You haven't placed any orders yet.
              </p>

              <button
                onClick={() => navigate('/collection')}
                className="mt-6 bg-[#4B072B] text-[#ffddd2] px-8 py-3 rounded-lg"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        <div>
            {
              orderData.map((item,index) => (
                <div key={index} className="border rounded-xl p-5 mb-6 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex flex-col sm:flex-row gap-5">
                        <img className="w-24 h-24 rounded-lg border object-cover" src={item.image[0]} alt="" />
                        <div>
                          <p className="text-base sm:text-lg font-semibold text-gray-800">{item.name}</p>
                          <div className="flex flex-wrap gap-3 mt-3 text-sm sm:text-base">
                            <p>{currency}{item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            {item.size !== "default" && (
                                <p>Size: {item.size}</p>
                              )}
                          </div>
                          <p className="mt-2 text-sm text-gray-500">Date: <span className=' text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                          <p className="mt-2 text-sm text-gray-500">Payment: <span className=' text-gray-400'>{item.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-8">
                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                            <p className="w-2.5 h-2.5 rounded-full bg-green-500"></p>
                            <p className='text-sm md:text-base'>{item.status}</p>
                        </div>
                        <button onClick={loadOrderData} className="w-full sm:w-auto border border-[#4B072B] text-[#4B072B] px-6 py-3 rounded-lg font-medium transition hover:bg-[#4B072B] hover:text-[#ffddd2]">Track Order</button>
                    </div>
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default Orders
