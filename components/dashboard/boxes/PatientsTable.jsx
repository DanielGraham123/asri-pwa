import { Tab } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import Moment from "react-moment";

// Import utilities
import { classNames, tailwindConfig } from "../../utils/Utils";

export default function PatientsTable() {
  const tabs = ["All", "Men", "Women", "Children"];
  const people = [
    {
      name: "Jane Cooper",
      disease: "Dirhea and Headaches",
      department: "Optimization",
      role: "Patient",
      phone: "+2376515233223",
      previousAppt: "2022/10/12",
      booked: false,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Cooper Doe",
      disease: "Malaria and Typhoid",
      department: "Optimization",
      role: "Patient",
      phone: "+2376515233223",
      previousAppt: "2022/11/24",
      booked: true,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    // More people...
  ];

  return (
    <div className="flex flex-col bg-white w-full border-slate-300 rounded-lg shadow-md pb-2">
      <Tab.Group as="div" className="my-3 px-5">
        {/* Header */}
        <div className="grid grid-cols-6 gap-2 items-center">
          <div className="col-span-1">
            <h2 className="">Patients</h2>
          </div>

          <div className="col-span-5 flex items-center flex-row">
            <div className="p relative mx-auto text-gray-600">
              <input
                className="border-2 border-gray-300 bg-white h-9 px-5 pr-16 rounded-lg text-sm focus:ring-0 focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-[10.3px] mr-4"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style={{ enableBackground: "new 0 0 56.966 56.966;" }}
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>

            <Tab.List className="mt- rounded-lg divide-x divide-gray-200 border-gray-200 border-2 flex w-[370px]">
              {tabs.map((tab, index) => (
                <Tab key={tab + "-patienttable-" + index} as={Fragment}>
                  {({ selected }) => (
                    /* Use the `selected` state to conditionally style the selected tab. */
                    <button
                      className={classNames(
                        selected
                          ? "bg-indigo-500 text-white border-indigo-500"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                        "group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-4 text-xs font-bold border text-center focus:z-10 outline-none uppercase",
                        index == 0 ? "rounded-l-lg" : "",
                        index == tabs.length - 1 ? "rounded-r-lg" : ""
                      )}
                    >
                      {tab}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>
        </div>

        {/* Table */}
        <Tab.Panels>
          {[...Array(4)].map((index) => (
            <Tab.Panel key={"patientpanel-" + index}>
              <div className="flex flex-col mt-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Disease
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Previous Appointment
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              New Appointment
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {people.map((person) => (
                            <tr key={person.phone}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                      className="h-10 w-10 rounded-full"
                                      src={person.image}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {person.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {person.phone}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {person.disease}
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-red-500">
                                  <Moment format="ll" className="">
                                    {person.previousAppt}
                                  </Moment>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  className={` rounded-full px-3 py-1 uppercase font-semibold text-xs text-gray-500 ${
                                    person.booked
                                      ? "text-white bg-indigo-700"
                                      : "border-2 border-gray-300 !px-4"
                                  }`}
                                >
                                  {person.booked ? "Booked" : "Book"}
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-5">
                <button className="rounded-full px-5 py-2 uppercase font-bold shadow-md border-2 border-gray-200 text-xs">
                  Go To Patients
                </button>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
