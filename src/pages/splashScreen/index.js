import { Transition } from "@headlessui/react";
import IcAuthCenter from "../../assets/icons/ic-auth-center.svg";
import IcDonate from "../../assets/icons/ic-logo.svg";
import React, { Fragment } from "react";

export const SplashScreen = ({ show }) => {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute flex flex-1 inset-0 bg-red-300 z-50 transition-all">
          <div className="min-h-screen min-w-full bg-gradient-to-b from-primary via-orange-400 to-primary">
            <div
              className={`flex flex-col px-5 pb-3 h-full overflow-hidden items-center justify-center`}
            >
              <img
                className="absolute w-screen max-w-2xl object-contain inset-0 m-auto"
                src={IcAuthCenter}
                alt="background"
              />
              {/* <div> */}
              <img
                className="max-w-[40vw] w-40 object-contain"
                src={IcDonate}
                alt="background"
              />
              <label className="font-inter font-semibold text-4xl text-white mt-2">
                iDonate
              </label>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition.Root>
  );
};
