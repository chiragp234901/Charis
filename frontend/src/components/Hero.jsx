import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section className="border border-gray-300 overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row items-center">

        {/* Left Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-10 lg:px-16 py-12 md:py-0">

          <div className="text-center md:text-left">

            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="w-10 lg:w-14 h-[2px] bg-[#414141]" />
              <p className="text-xs sm:text-sm md:text-base font-medium tracking-widest text-[#414141]">
                OUR BESTSELLERS
              </p>
            </div>

            <h1 className="prata-regular mt-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight text-[#414141]">
              Latest Arrivals
            </h1>

            <div className="mt-6 flex items-center justify-center md:justify-start gap-3 cursor-pointer group">
              <p className="font-semibold text-sm sm:text-base">
                SHOP NOW
              </p>

              <span className="w-10 lg:w-14 h-[2px] bg-[#414141] transition-all duration-300 group-hover:w-20" />
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.hero}
            alt="Hero"
            className="w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[650px] object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;