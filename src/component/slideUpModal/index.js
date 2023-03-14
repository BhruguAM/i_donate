import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export const SlideUpModal = ({
  isShowing = false,
  setShowing,
  strict,
  ModalContent,
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={isShowing} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={() => setShowing()}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-all" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full pt-20">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="relative transform bg-primaryBg shadow-xl transition-all w-full rounded-t-xl overflow-hidden flex justify-center">
                <div className="max-w-2xl w-full">{ModalContent}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
