import Image from "next/image";
import React from "react";

import Image01 from "@/assets/user-36-05.jpg";
import Image02 from "@/assets/user-36-06.jpg";
import Image03 from "@/assets/user-36-07.jpg";
import Image04 from "@/assets/user-36-08.jpg";
import Image05 from "@/assets/user-36-09.jpg";

function DashboardCard10() {
  const customers = [
    {
      id: "0",
      image: Image01,
      name: "Alex Shatov",
      treatment: "Malaria",
      phone: "651523013",
      date: "23/08/2022",
      location: "Molyko, Buea",
    },
    {
      id: "1",
      image: Image02,
      name: "Philip Harbach",
      treatment: "Malaria",
      phone: "651523013",
      date: "23/08/2022",
      location: "Molyko, Buea",
    },
    {
      id: "2",
      image: Image03,
      name: "Mirko Fisuk",
      treatment: "Malaria",
      phone: "651523013",
      date: "23/08/2022",
      location: "Molyko, Buea",
    },
    {
      id: "3",
      image: Image04,
      name: "Olga Semklo",
      treatment: "Fever",
      phone: "651523013",
      date: "23/08/2022",
      location: "Molyko, Buea",
    },
    {
      id: "4",
      image: Image05,
      name: "Burak Long",
      treatment: "Malaria",
      phone: "651523013",
      date: "23/08/2022",
      location: "Molyko, Buea",
    },
  ];

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent Patients</h2>
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
              {customers.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                          <Image
                            className="rounded-full"
                            src={customer.image}
                            width="40"
                            height="40"
                            alt={customer.name}
                          />
                        </div>
                        <div className="font-medium text-slate-800">
                          {customer.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.treatment}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-pink-700">
                        {customer.phone}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-sm text-left">{customer.date}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap ">
                      <div className="text-sm text-left text-emerald-500">
                        {customer.location}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;
