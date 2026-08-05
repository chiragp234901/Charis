import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <div className="sticky top-0 z-50 bg-[#4B072B] shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
      
            <Link to='/'><img src={assets.logo} alt="Charis" className="w-28 sm:w-36 md:w-44 lg:w-52 h-auto object-contain"/></Link>

                <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-sm lg:text-base text-[#ffddd2]">
                
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `transition duration-200 ${
                                isActive
                                    ? "text-white"
                                    : "text-[#ffddd2] hover:text-white"
                            }`
                        }
                    >
                        <p>HOME</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-[#ffddd2] hidden' />
                    </NavLink>
                    <NavLink
                        to="/collection"
                        className={({ isActive }) =>
                            `transition duration-200 ${
                                isActive
                                    ? "text-white"
                                    : "text-[#ffddd2] hover:text-white"
                            }`
                        }
                    >
                        <p>COLLECTION</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-[#ffddd2] hidden' />
                    </NavLink>
                    <NavLink
                        to="/gift-recommendation"
                        className={({ isActive }) =>
                            `transition duration-200 ${
                                isActive
                                    ? "text-white"
                                    : "text-[#ffddd2] hover:text-white"
                            }`
                        }
                    >
                        <p>GIFT FINDER</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-[#ffddd2] hidden' />
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `transition duration-200 ${
                                isActive
                                    ? "text-white"
                                    : "text-[#ffddd2] hover:text-white"
                            }`
                        }
                    >
                        <p>ABOUT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-[#ffddd2] hidden' />
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `transition duration-200 ${
                                isActive
                                    ? "text-white"
                                    : "text-[#ffddd2] hover:text-white"
                            }`
                        }
                    >
                        <p>CONTACT</p>
                        <hr className='w-2/4 border-none h-[1.5px] bg-[#ffddd2] hidden' />
                    </NavLink>

                </ul>

                <div className="flex items-center gap-3 sm:gap-5">
                    <img onClick={()=> { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className="w-5 sm:w-6 lg:w-7 cursor-pointer transition hover:scale-110" alt="" />
                    
                    <div className='group relative'>
                        <img onClick={()=> token ? null : navigate('/login') } className="w-6 sm:w-7 cursor-pointer transition hover:scale-110" src={assets.profile_icon} alt="" />
                        {/* Dropdown Menu */}
                        {token && 
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-[#ffddd2] text-[#4B072B] rounded'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>}
                    </div> 
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className="w-6 sm:w-7" alt="" />
                        <p className="absolute -right-2 -bottom-2 flex items-center justify-center w-5 h-5 rounded-full bg-[#ffddd2] text-black text-[10px] font-semibold">{getCartCount()}</p>
                    </Link> 
                    <img onClick={()=>setVisible(true)} src={assets.menu_icon} className="w-7 cursor-pointer md:hidden" alt="" /> 
                </div>
            </div>
                {/* Overlay */}
                    {visible && (
                        <div
                            className="fixed inset-0 bg-black/40 z-[998] md:hidden"
                            onClick={() => setVisible(false)}
                        />
                    )}

                {/* Sidebar menu for small screens */}
                <div
                    className={`fixed top-0 right-0 z-[999] h-screen w-72 bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ${
                    visible ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex flex-col min-h-screen text-gray-600">
                        <div
                        onClick={() => setVisible(false)}
                        className="flex items-center gap-4 p-5 cursor-pointer border-b"
                        >
                        <img
                            className="h-4 rotate-180"
                            src={assets.dropdown_icon}
                            alt=""
                        />
                        <p>Back</p>
                        </div>

                        <NavLink
                        onClick={() => setVisible(false)}
                        className="py-4 px-6 border-b hover:bg-[#ffddd2] transition"
                        to="/"
                        >
                        HOME
                        </NavLink>

                        <NavLink
                        onClick={() => setVisible(false)}
                        className="py-4 px-6 border-b hover:bg-[#ffddd2] transition"
                        to="/collection"
                        >
                        COLLECTION
                        </NavLink>

                        <NavLink
                        onClick={() => setVisible(false)}
                        className="py-4 px-6 border-b hover:bg-[#ffddd2] transition"
                        to="/gift-recommendation"
                        >
                        GIFT FINDER
                        </NavLink>

                        <NavLink
                        onClick={() => setVisible(false)}
                        className="py-4 px-6 border-b hover:bg-[#ffddd2] transition"
                        to="/about"
                        >
                        ABOUT
                        </NavLink>

                        <NavLink
                        onClick={() => setVisible(false)}
                        className="py-4 px-6 border-b hover:bg-[#ffddd2] transition"
                        to="/contact"
                        >
                        CONTACT
                        </NavLink>
                    </div>
                </div>
    </div>               
    
  )
}

export default Navbar
