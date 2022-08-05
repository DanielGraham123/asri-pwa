import React, { useEffect, useState } from "react";
import DashboardLayout, { useHeaderContext } from "@/layouts/dashboardLayout";
import Head from "next/head";
import { GoSearch } from "react-icons/go";

import appointmentlist from "@/appointmentlist";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Appointments() {
  const appointments = appointmentlist;
  const { title, setTitle } = useHeaderContext();
  const [searchTerm, setSearch] = useState("");
  const [data, setAppointmentData] = useState([]);

  const nameOp = appointments.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const treatmentOp = appointments.filter((item) =>
    item.diseaseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("data values: ", data);

  // const getSelectedRecords = () => data.filter((item) => item.selected);

  useEffect(() => {
    setAppointmentData(
      !searchTerm ? appointments : nameOp.length > 0 ? nameOp : treatmentOp
    );
  }, [data]);

  useEffect(() => {
    setTitle("Appointments");
    console.log("title: ", title);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
              <header className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">
                  List of Appointments
                </h2>

                {/* search field */}
                <label htmlFor="searchAppointments" className="relative">
                  <input
                    type="search"
                    id="searchAppointments"
                    className="focus:ring-transparent focus:border-indigo-500 focus:border-2 focus:outline-none rounded-lg py-1 pr-6 text-sm w-[220px]"
                    placeholder="Search Name or Disease"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <GoSearch
                    className="text-gray-400 absolute top-2 right-3"
                    size={15}
                  />
                </label>
              </header>
              <table className="min-w-full divide-y shadow-lg divide-gray-200">
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
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.map((person, index) => (
                    <tr key={person.email + "-" + index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image
                              className="h-10 w-10 rounded-full"
                              src={person.image}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {person.diseaseTitle}
                        </div>
                        <div className="text-sm text-gray-500">
                          {person.treatment}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={classNames(
                            person.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : person.status === "Upcoming"
                              ? "bg-yellow-100 text-orange-800"
                              : "bg-red-100 text-red-800",
                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          )}
                        >
                          {person.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.phone}
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
    </>
  );
}

Appointments.Layout = DashboardLayout;
