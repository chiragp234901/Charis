import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "Enjoy a hassle-free exchange process for eligible products.",
    },
    {
      icon: assets.quality_icon,
      title: "7 Days Return",
      description: "Return your purchase within 7 days for a smooth shopping experience.",
    },
    {
      icon: assets.support_img,
      title: "24/7 Customer Support",
      description: "Our support team is available anytime to assist you with your queries.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

        {policies.map((policy, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-xl transition duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <img
              src={policy.icon}
              alt={policy.title}
              className="w-12 sm:w-14 mb-5"
            />

            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              {policy.title}
            </h3>

            <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xs">
              {policy.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default OurPolicy;