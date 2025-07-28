"use client";

import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const [isOpen, setIsOpen] = useState(false);
  const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group mt-10 pt-3"> {/* Added mt-10 and reduced top padding */}
      <div className="car-card__content w-full">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
        <p className="car-card__price">
          <span className="text-[16px]">$</span>
          {carRent}
          <span className="text-[16px]">/day</span>
        </p>
      </div>

      <div className="relative w-full h-40 my-3">
        <Image
          src={generateCarImageUrl(car)}
          alt="car model"
          fill
          priority
          className="object-contain rounded-md"
        />
      </div>

      <div className="relative flex w-full mt-4">
        <div className="flex group-hover:invisible w-full justify-between text-sm text-gray-300">
          <div className="flex flex-col justify-center items-center gap-1">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p>{transmission === "a" ? "Automatic" : "Manual"}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <Image src="/tire.svg" width={20} height={20} alt="drive" />
            <p>{drive.toUpperCase()}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <Image src="/gas.svg" width={20} height={20} alt="mpg" />
            <p>{city_mpg} MPG</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity">
          <CustomButton
            title="View More"
            containerStyles="w-full py-[14px] rounded-full bg-blue-600 hover:bg-blue-700"
            textStyles="text-white text-[14px] font-semibold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
