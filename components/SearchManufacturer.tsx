"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

import { manufacturers } from "@constants";
import { SearchManuFacturerProps } from "@types";

const SearchManufacturer = ({ manufacturer, setManuFacturer }: SearchManuFacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className='relative w-full max-w-xs'>
      <Combobox value={manufacturer} onChange={setManuFacturer}>
        <div className='relative'>
          <Combobox.Button className='absolute inset-y-0 left-0 flex items-center pl-4'>
            <Image
              src='/car-logo.svg'
              width={20}
              height={20}
              alt='car logo'
              className='object-contain'
            />
          </Combobox.Button>

          <Combobox.Input
            className='w-full py-2.5 pl-12 pr-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue'
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Volkswagen...'
          />

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {filteredManufacturers.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className='cursor-default select-none py-2 px-4 text-gray-700'
                >
                  Create "{query}"
                </Combobox.Option>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `cursor-default select-none py-2 px-4 ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {item}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
