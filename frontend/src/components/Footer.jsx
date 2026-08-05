import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-[#4B072B] text-[#ffddd2] mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 px-6 sm:px-8 lg:px-12 py-14 items-start">

        <div>
            <img
                src={assets.logo}
                alt="Charis"
                className="w-48 sm:w-56 mb-6"
            />
            <p className="max-w-md leading-7 text-sm sm:text-base text-[#ffddd2]/90">
            At Charis, we believe every gift has the power to create lasting memories and strengthen meaningful 
            relationships. Our thoughtfully curated collection and AI-powered recommendations make it easy to find the 
            perfect gift for every occasion. We're dedicated to delivering quality, convenience, and a joyful gifting 
            experience from start to finish.
            </p>
        </div>

        <div>
            <p className="text-xl font-semibold mb-5">COMPANY</p>
            <ul className="space-y-3">

                <li>
                    <a href="/" className="hover:text-white transition">
                        Home
                    </a>
                </li>

                <li>
                    <a href="/about" className="hover:text-white transition">
                        About Us
                    </a>
                </li>

                <li>
                    <a href="/collection" className="hover:text-white transition">
                        Collections
                    </a>
                </li>

                <li>
                    <a href="/contact" className="hover:text-white transition">
                        Contact
                    </a>
                </li>

            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 text-[#ffddd2] '>GET IN TOUCH</p>
            <ul className="space-y-3">

                <li>📞 +91 9054012319</li>

                <li>✉️ chiragp2597@gmail.com</li>

                <li>📍 Navsari, Gujarat, India</li>

            </ul>
        </div>

        <div className="flex gap-4 mt-6">

            <img className="w-6 cursor-pointer hover:scale-110 transition" src={assets.facebook_icon} alt="" />

            <img className="w-6 cursor-pointer hover:scale-110 transition" src={assets.instagram_icon} alt="" />

            <img className="w-6 cursor-pointer hover:scale-110 transition" src={assets.linkedin_icon} alt="" />

        </div>

      </div>

        <div>
            <hr className='border-[#ffddd2]'/>
            <p className="py-6 text-center text-sm text-[#ffddd2]/80">
                © 2026 Charis. All Rights Reserved.
            </p>
        </div>

    </div>
  )
}

export default Footer
