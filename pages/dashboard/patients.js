import React, { useEffect, useRef, useState } from "react";
import DashboardLayout, {
  useHeaderContext,
} from "../../layouts/dashboardLayout";
import Head from "next/head";
import { GoIssueOpened, GoSearch } from "react-icons/go";
import Transition from "../../components/utils/Transition";
import { MdFilterAlt } from "react-icons/md";

import patientslist from "./patientlist";
import Image from "next/image";

const filterDates = [
  "Today",
  "Last 7 Days",
  "Last Month",
  "Last 12 Months",
  "All Time",
];

export default function Patients() {
  const { title, setTitle } = useHeaderContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filterDates[0]);
  const [searchTerm, setSearch] = useState("");

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const patients = patientslist;

  console.log("patients array: ", patientslist);

  const nameOp = patients.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const treatmentOp = patients.filter((item) =>
    item.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const data = !searchTerm
    ? patients
    : nameOp.length > 0
    ? nameOp
    : treatmentOp;

  console.log("data values: ", data);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    setTitle("Patients");
    console.log("title: ", title);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div>
        {/* top section */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              Patients Archive
            </h1>
          </div>
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            <div className="table-items-action hidden">
              <div className="flex items-center">
                <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap">
                  <span className="table-items-count"></span> items selected
                </div>
                <button className="btn bg-white border-gray-200 hover:border-gray-300 text-red-500 hover:text-red-600">
                  Delete
                </button>
              </div>
            </div>
            <div className="relative">
              <button
                className="btn justify-between min-w-44 bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
                aria-label="Select date range"
                aria-haspopup="true"
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="flex items-center gap-2">
                  <MdFilterAlt size={20} />
                  <span>{selectedFilter}</span>
                </span>
                <svg
                  className="shrink-0 ml-1 fill-current text-gray-400"
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                >
                  <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
                </svg>
              </button>

              <Transition
                show={dropdownOpen}
                tag="div"
                className="origin-top-right z-10 absolute top-full left-0 right-auto md:left-auto md:right-0 min-w-56 bg-white border border-slate-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
              >
                <div
                  ref={dropdown}
                  className="font-medium text-sm text-gray-600"
                >
                  {filterDates.map((filter, index) => (
                    <button
                      key={index + "-" + filter}
                      onClick={() => {
                        setSelectedFilter(filter);
                        setDropdownOpen(!dropdownOpen);
                      }}
                      className={`flex items-center w-full hover:bg-gray-50 py-1 px-3 cursor-pointer
                       ${selectedFilter === filter && "text-indigo-500"}`}
                    >
                      <svg
                        className={
                          selectedFilter === filter
                            ? "shrink-0 mr-2 fill-current text-indigo-500"
                            : "invisible mr-2"
                        }
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                      >
                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                      </svg>
                      <span>{filter}</span>
                    </button>
                  ))}
                </div>
              </Transition>
            </div>

            {/* Signal Issue */}
            <button className="btn bg-orange-400 hover:bg-orange-500 text-gray-800">
              <GoIssueOpened />
              <span className="hidden xs:block ml-2">File An Issue</span>
            </button>
          </div>
        </div>

        {/* table section */}

        <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
          <header className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Recent Patients</h2>

            {/* search field */}
            <label htmlFor="searchTable" className="relative">
              <input
                type="search"
                id="searchTable"
                className="focus:ring-transparent focus:border-indigo-500 focus:border-2 focus:outline-none rounded-lg py-1 pr-6 text-sm w-[220px]"
                placeholder="Search Name or Treatment"
                onChange={(e) => setSearch(e.target.value)}
              />
              <GoSearch
                className="text-gray-400 absolute top-2 right-3"
                size={15}
              />
            </label>
          </header>
          <div className="p-3">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                {/* Table header */}
                <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Treatment</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Phone</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Date</div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-left">Location</div>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-slate-100">
                  {data?.map((patient) => (
                    <tr key={patient.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <Image
                              className="rounded-full"
                              src={patient.image}
                              width="40"
                              height="40"
                              alt={patient.name}
                            />
                          </div>
                          <div className="font-medium text-slate-800">
                            {patient.name}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{patient.treatment}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-pink-700">
                          {patient.phone}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-sm text-left">{patient.date}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap ">
                        <div className="text-sm text-left text-emerald-500">
                          {patient.status}
                        </div>
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

Patients.Layout = DashboardLayout;
