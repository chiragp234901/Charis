import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':

                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }

                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row gap-10 lg:gap-16 pt-8 sm:pt-12 border-t">
            {/* ------------- Left Side ---------------- */}
            <div className="w-full lg:max-w-xl space-y-4">

                <div className="mb-6">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-1 focus:ring-[#4B072B]" type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-1 focus:ring-[#4B072B]" type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-1 focus:ring-[#4B072B]" type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-1 focus:ring-[#4B072B]" type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-1 focus:ring-[#4B072B]" type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-1 focus:ring-[#4B072B]" type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-1 focus:ring-[#4B072B]" type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-1 focus:ring-[#4B072B]" type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#4B072B] focus:ring-1 focus:ring-[#4B072B]" type="number" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-8'>

                <div className="w-full lg:max-w-md">
                    <CartTotal />
                </div>

                <div className="mt-10">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('cod')} className={`flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition ${
                                        method === "cod"
                                            ? "border-[#4B072B] bg-[#ffddd2]/30"
                                            : "hover:border-gray-400"
                                    }`}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-[#4B072B]' : ''}`}></p>
                            <p className="text-sm font-medium text-gray-700">CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className="w-full bg-[#4B072B] text-[#ffddd2] py-4 rounded-lg font-semibold transition hover:bg-[#64103c]">PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
