import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
          Subscribe & Get 30% Off
        </h2>

        <p className="mt-4 text-sm sm:text-base text-gray-500 leading-7">
          Be the first to discover new arrivals, exclusive offers, and special
          gift ideas delivered straight to your inbox.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="mt-8 flex flex-col sm:flex-row items-center border rounded-lg overflow-hidden shadow-sm"
        >
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full px-5 py-4 outline-none text-sm sm:text-base"
          />

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#4B072B] text-[#ffddd2] px-8 py-4 font-medium transition hover:bg-[#64103c]"
          >
            SUBSCRIBE
          </button>
        </form>

      </div>
    </section>
  );
};

export default NewsletterBox;