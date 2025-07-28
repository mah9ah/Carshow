"use client";

import Image from "next/image";
import { CustomButton } from "@components";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero min-h-screen flex-col xl:flex-row flex items-center justify-between gap-10 px-6 xl:px-16 pt-28 bg-white">
      <div className="flex-1 text-center xl:text-left">
        <h1 className="hero__title">
          Find it. Book it. Drive it.
        </h1>
        <p className="hero__subtitle">
          Enjoy hassle-free rentals with quick reservations
        </p>
        <div className="mt-10 flex justify-center xl:justify-start">
          <CustomButton
            title="Explore Cars"
            containerStyles="bg-primary-blue text-white rounded-full px-8 py-4 text-lg"
            handleClick={handleScroll}
          />
        </div>
      </div>

      <div className="relative flex-1 w-full h-[500px] flex justify-center items-center">
        {/* Bigger red carpet-style background box */}
        <div className="absolute w-[100%] h-[90%] bg-red-600 rounded-3xl z-0 shadow-lg" />

        {/* Foreground car image */}
        <div className="relative w-full h-full z-10">
          <Image
            src="/hero.png"
            alt="hero car"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
