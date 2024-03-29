import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../button";

export function Modal({ open, setOpen, isOkay, ModalContent, strict }) {
  //   const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={() => (strict ? {} : setOpen())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="scale-0"
          enterTo="scale-100"
          leave="ease-in duration-200"
          leaveFrom="scale-100"
          leaveTo="scale-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-all" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="scale-0 sm:scale-0"
              enterTo="scale-100 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="scale-100 sm:scale-100"
              leaveTo="scale-0 sm:scale-0"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all w-full max-w-2xl">
                {ModalContent}
                {isOkay && (
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      secondary={true}
                      title={"Ok"}
                      onClick={() => setOpen(false)}
                    />
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
