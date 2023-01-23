import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import IcDownArrow from "../../assets/icons/ic-dropdown.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Dropdown = ({
  items,
  value,
  onChange,
  title,
  showValue = "select",
  disabled = false,
}) => {
  return (
    <Listbox disabled={disabled} value={value} onChange={onChange}>
      {({ open }) => (
        <>
          {title && (
            <Listbox.Label className={`block text-sm font-medium text-primary`}>
              {title}
            </Listbox.Label>
          )}
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default border-b border-gray-300 bg-white py-2 text-left shadow-sm focus:outline-none sm:text-sm">
              <span className="flex items-center">
                <span className="block truncate text-greyout">{showValue}</span>
              </span>
              {!disabled && (
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <img
                    src={IcDownArrow}
                    className="h-3 w-3 text-gray-400 object-contain"
                    aria-hidden="true"
                    alt=">"
                  />
                </span>
              )}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 max-h-56 w-full overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((i, k) => (
                  <Listbox.Option
                    key={i.created_at + "" + k}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-primary" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={i}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {i.avatar && (
                            <img
                              src={i.avatar}
                              alt=""
                              className="h-6 w-6 flex-shrink-0 rounded-full"
                            />
                          )}
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {title === "Donation To"
                              ? i.organization_name
                              : title === "Donation For"
                              ? i.category_name
                              : i.event_name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
