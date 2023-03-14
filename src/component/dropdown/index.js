import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import IcDownArrow from "../../assets/icons/ic-dropdown.svg";
import { useLocation } from "react-router-dom";

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
  isError = false,
  extraClass = "",
  showError = true,
}) => {
  const location = useLocation();
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
            <Listbox.Button
              className={`relative w-full cursor-default border-b ${
                isError
                  ? "border-red-700"
                  : open
                  ? "border-lineColor"
                  : "border-gray-300"
              } ${
                location.pathname.includes("auth")
                  ? "bg-primaryBg"
                  : "bg-primaryCard"
              } py-2 text-left shadow-sm focus:outline-none sm:text-sm ${extraClass}`}
            >
              <span className="flex items-center">
                <span className="block truncate text-black">{showValue}</span>
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
              {showError && (
                <label className="absolute -bottom-4 text-xs text-red-700">
                  {isError}
                </label>
              )}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-20 max-h-56 w-full overflow-auto bg-white shadow-xl rounded-b-xl text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((i, k) => (
                  <Listbox.Option
                    key={i.created_at + "" + k}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-primary" : "text-gray-900",
                        "relative cursor-default select-none py-2"
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
                            {title === "Donation To*"
                              ? i.organization_name
                              : title === "Donation For*"
                              ? i.category_name
                              : title === "Event Type*"
                              ? i.event_name
                              : i.label}
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
