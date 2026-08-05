import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

       <div className="border-t pt-10 sm:pt-14 text-center">
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-12 lg:my-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <img className="w-full lg:w-1/2 rounded-2xl shadow-lg object-cover" src={assets.about} alt="" />
          <div className="lg:w-1/2 space-y-6 text-gray-600">
              <h2 className="text-3xl font-bold text-[#4B072B]">
                  Welcome to Charis
              </h2>

              <p className="leading-8 text-base">
                At <strong>Charis</strong>, we believe that every gift tells a story.
                Our mission is to make gift-giving effortless, meaningful, and memorable
                by helping people discover the perfect gift for every occasion.
              </p>
              <p className="leading-8 text-base">
                Whether you're celebrating a birthday, anniversary, festival,
                graduation, or any special moment, Charis offers a carefully curated
                collection of gifts for friends, family, colleagues, and loved ones.
                With our intelligent recommendation system, personalized suggestions,
                and user-friendly shopping experience, finding the right gift has never
                been easier.
              </p>
              <h3><b>Why Choose Charis?</b></h3>

              <ul className="space-y-3">
                <li> ✓ Thoughtfully curated gifts for every occasion and recipient.</li>
                <li> ✓  AI-powered personalized gift recommendations.</li>
                <li> ✓  High-quality products from trusted sellers.</li>
                <li> ✓  Secure shopping and reliable delivery.</li>
                <li> ✓  A simple and enjoyable gifting experience.</li>
              </ul>

            <h3 className="text-2xl font-semibold text-[#4B072B]">
                Our Mission
            </h3>

            <p className="leading-8 text-base">
              Our mission is to make gifting simple, thoughtful, and accessible by
              connecting people with meaningful gifts that create lasting memories.
              We aim to take the stress out of gift shopping through smart technology
              and a customer-first approach.
            </p>

            <h3 className="text-2xl font-semibold text-[#4B072B]">
                Our Vision
            </h3>

            <p className="leading-8 text-base">
              To become the most trusted and innovative online gifting platform,
              empowering people to celebrate every special moment with confidence and
              joy.
            </p>

            <p className="leading-8 text-base">
              At <strong>Charis</strong>, we don't just help you buy gifts—we help you
              create unforgettable moments and strengthen meaningful relationships.
            </p>

            <p className="leading-8 text-base">
              <strong>Thank you for choosing Charis.</strong> We look forward to being
              a part of your special moments.
            </p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">
          <div className= "border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <h3 className="text-xl font-semibold text-[#4B072B]">
                🎁 Personalized Gift Recommendations
            </h3>
            <p className="text-gray-600 leading-7">Discover the perfect gift with AI-powered recommendations tailored to the
      recipient, occasion, and your preferences.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <h3 className="text-xl font-semibold text-[#4B072B]">✨ Wide Range of Quality Gifts</h3>
            <p className="text-gray-600 leading-7">Explore a carefully curated collection of high-quality products for every
      age, relationship, and celebration—all in one place.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <h3 className="text-xl font-semibold text-[#4B072B]">🚚 Safe & Hassle-Free Shopping</h3>
            <p className="text-gray-600 leading-7">Enjoy a secure shopping experience with an easy-to-use interface, trusted
      payments, and reliable delivery to make gifting stress-free.</p>
          </div>
      </div>

      <div className="bg-[#4B072B] rounded-2xl py-12 px-8 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

            <div>
                <h2 className="text-4xl font-bold text-[#ffddd2]">1000+</h2>
                <p className="text-white mt-2">Happy Customers</p>
            </div>

            <div>
                <h2 className="text-4xl font-bold text-[#ffddd2]">500+</h2>
                <p className="text-white mt-2">Unique Gifts</p>
            </div>

            <div>
                <h2 className="text-4xl font-bold text-[#ffddd2]">24/7</h2>
                <p className="text-white mt-2">Customer Support</p>
            </div>

            <div>
                <h2 className="text-4xl font-bold text-[#ffddd2]">100%</h2>
                <p className="text-white mt-2">Secure Shopping</p>
            </div>

        </div>
    </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
