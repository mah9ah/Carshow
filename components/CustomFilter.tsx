"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";

import { CustomFilterProps } from "@types";
import { updateSearchParams } from "@utils";

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]);

  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());
    router.push(newPathName);
  };

  return (
    <div className='relative w-full max-w-xs'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        <div className='relative'>
          <Listbox.Button className='w-full py-2.5 px-4 border border-gray-300 rounded-md bg-white text-sm flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary-blue'>
            <span className='block truncate'>{selected.title}</span>
            <Image
              src='/chevron-up-down.svg'
              width={20}
              height={20}
              alt='chevron'
              className='ml-2 object-contain'
            />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) =>
                    `cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
