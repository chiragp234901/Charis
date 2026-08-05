import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className="border-t pt-10 sm:pt-14 text-center">
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-12 lg:my-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-20">
        <img className="w-full lg:w-1/2 rounded-2xl shadow-lg object-cover" src={assets.contact} alt="" />
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-2xl font-semibold text-[#4B072B]">Our Store</h2>
          <div className="rounded-xl border bg-gray-50 p-6">Mandir Faliya, VTC: Dhakwada <br /> Sub District: Gandevi, Dist: Navsari
          <br /> State: Gujarat, India, 396380</div>
          <div className="space-y-3">

            <div className="flex items-center gap-3">
              <span className="text-xl">📞</span>
              <span className="text-gray-600">
                +91 9054012319
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">✉️</span>
              <span className="text-gray-600">
                chiragp2597@gmail.com
              </span>
            </div>

          </div>
          <h2 className="text-2xl font-semibold text-[#4B072B]">Careers at Charis</h2>
          <p className="text-gray-600 leading-7">Learn more about our teams and job openings.</p>
          <div className="space-y-2">

            <h3 className="text-xl font-semibold text-[#4B072B]">
              Business Hours
            </h3>

            <p className="text-gray-600">
              Monday – Saturday
            </p>

            <p className="text-gray-600">
              9:00 AM – 6:00 PM
            </p>

          </div>
          <button className="bg-[#4B072B] text-[#ffddd2] px-8 py-4 rounded-lg font-medium transition hover:bg-[#64103c]">Explore Jobs</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">

      <div className="rounded-xl border p-8 text-center hover:shadow-lg transition">
        <h3 className="text-3xl">📍</h3>
        <h4 className="mt-4 font-semibold text-[#4B072B]">
          Visit Us
        </h4>
        <p className="mt-2 text-gray-600">
          Navsari, Gujarat
        </p>
      </div>

      <div className="rounded-xl border p-8 text-center hover:shadow-lg transition">
        <h3 className="text-3xl">📞</h3>
        <h4 className="mt-4 font-semibold text-[#4B072B]">
          Call Us
        </h4>
        <p className="mt-2 text-gray-600">
          +91 9054012319
        </p>
      </div>

      <div className="rounded-xl border p-8 text-center hover:shadow-lg transition">
        <h3 className="text-3xl">✉️</h3>
        <h4 className="mt-4 font-semibold text-[#4B072B]">
          Email Us
        </h4>
        <p className="mt-2 text-gray-600">
          chiragp2597@gmail.com
        </p>
      </div>

    </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
