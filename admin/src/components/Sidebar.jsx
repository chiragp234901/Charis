import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className="hidden md:flex w-64 min-h-screen bg-white border-r shadow-sm">
        <div className='flex flex-col gap-4 p-6 text-[15px]'>
                    <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#4B072B]">
                Admin Panel
            </h2>

            <p className="text-sm text-gray-500 mt-1">
                Manage your store
            </p>
        </div>

            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all ${
                    isActive
                        ? "bg-[#4B072B] text-white"
                        : "hover:bg-[#ffddd2] text-gray-700"
                    }`
                }
                >
                <img className="w-5 h-5" src={assets.dashboard_icon || assets.order_icon} alt="" />
                <p className="hidden lg:block">Dashboard</p>
            </NavLink>

            <NavLink className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all ${
                        isActive
                        ? "bg-[#4B072B] text-white shadow-md"
                        : "text-gray-700 hover:bg-[#ffddd2]"
                    }`
                    } to="/add">
                <img className='w-5 h-5' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all ${
                    isActive
                    ? "bg-[#4B072B] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#ffddd2]"
                }`
                } to="/list">
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-l-lg transition-all ${
                    isActive
                    ? "bg-[#4B072B] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#ffddd2]"
                }`
                } to="/orders">
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar