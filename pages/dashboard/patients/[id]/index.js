import DashboardLayout, { useHeaderContext } from "@/layouts/dashboardLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import patients from "@/patientlist";
import Card from "@/components/Card";
import Image05 from "@/assets/user-36-09.jpg";
import Image from "next/image";
import moment from "moment";

import { MdOutlineUploadFile } from "react-icons/md";
import { RiFileTextLine } from "react-icons/ri";

import patientSummary from "@/patient-summary";
import { FcAbout, FcBusinessman, FcCamera, FcFullTrash } from "react-icons/fc";
import { IoMdCall } from "react-icons/io"
import { FaTelegram } from "react-icons/fa"
import ChatBot from 'react-simple-chatbot';
import styled from 'styled-components'

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Sort,
} from "@syncfusion/ej2-react-grids";
import TelegramFAB from "@/components/TelegramFAB";

import Profile from "@/assets/user-36-02.jpg";


const files = [
  {
    name: "blood tests.pdf",
    size: "25kb",
  },
  {
    name: "Medical Prescriptions.pdf",
    size: "5kb",
  },
  {
    name: "X-Ray results 2.pdf",
    size: "2kb",
  },
  {
    name: "X-Ray results.pdf",
    size: "25kb",
  },
  {
    name: "X-Ray results 2.pdf",
    size: "2kb",
  },
  {
    name: "X-Ray results.pdf",
    size: "25kb",
  },
];

const steps = [
  {
    id: '0',
    message: 'Hey Geek!',

    // This calls the next id
    // i.e. id 1 in this case
    trigger: '1',
  }, {
    id: '1',

    // This message appears in
    // the bot chat bubble
    message: 'Please write your username',
    trigger: '2'
  }, {
    id: '2',

    // Here we want the user
    // to enter input
    user: true,
    trigger: '3',
  }, {
    id: '3',
    message: " hi {previousValue}, how can I help you?",
    trigger: 4
  }, {
    id: '4',
    options: [

      // When we need to show a number of
      // options to choose we create alist
      // like this
      { value: 1, label: 'View Courses' },
      { value: 2, label: 'Read Articles' },

    ],
    end: true
  }
];


function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default function PatientID() {
  const hasWindow = typeof window !== "undefined";

  const { title, setTitle } = useHeaderContext();
  const [testImg, setTestImg] = useState();
  const [note, setNote] = useState("");
  const [windowSize, setWindowSize] = useState(hasWindow && getWindowSize());

  const router = useRouter();

  const patientData = router.query;

  const formatAgeColumn = (field, data, column) => {
    return data[field] + "yrs";
  };

  const formatBMIWeight = (field, data, column) => {
    return `${data[field]}`.charAt(0).toUpperCase() + `${data[field]}`.slice(1);
  };

  useEffect(() => {
    setTitle(patientData?.name);
    console.log("title: ", title);
    console.log("records: ", patients);
  }, []);

  useEffect(() => {
    setTestImg(patients.filter((item) => item.id === parseInt(patientData.id)));
    console.log("rec testImg: ", testImg);
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  console.log("record: ", router.query);

  const actions = [
    { label: "About", icon: <FcAbout />, onClick: console.log },
    { label: "Profile", icon: <FcBusinessman />, onClick: console.log },
    { label: "Picture", icon: <FcCamera />, onClick: console.log },
    { label: "Trash", icon: <FcFullTrash />, onClick: console.log },
  ];

  // Set some properties of the bot
  const config = {
    botAvatar: "@/assets/user-36-02.jpg",
    floating: true,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="container grid grid-cols-3 xl:grid-cols-4 gap-3">
        {/* Patient Info */}
        <div className="col-span-2 xl:col-span-2 flex flex-col">
          <Card classes={"flex items-center grid grid-cols-2 gap-2 p-0"}>
            <div className="border-r-2 p-5 w-full border-gray-200">
              <div className="text-center">
                <Image src={Image05} className="w-12 h-10 rounded-full" />
                <div className="py-2 text-lg font-bold">
                  {patientData?.name}
                </div>
                <a href="https://t.me/enow9315" target="_blank" className="tracking-wide text-gray-500 text-md items-center">
                  <FaTelegram size={23} className="inline-block mb-1 text-blue-400" />{patientData?.phone}
                </a>
              </div>

              <div className="text-center">
                <div className="font-bold py-2 mt-1 text-sm">Appointments</div>
                <div className="mt-2 grid gap-2 divide-x divide-gray-500 grid-cols-2">
                  <div>
                    <p className="text-4xl font-bold">5</p>
                    <small className="text-gray-500">Past</small>
                  </div>
                  <div>
                    <p className="text-4xl font-bold">2</p>
                    <small className="text-gray-500">Upcoming</small>
                  </div>
                </div>
                <button
                  className="bg-blue-600 text-white shadow-lg px-3 py-2 hover:transition-opacity hover:opacity-70 duration-300 rounded-lg mt-4 w-full"
                  onClick={() =>
                    router.push({
                      pathname: `/patients/${patientData.id}/booklet`,
                      query: patientData,
                    })
                  }
                >
                  View Booklet
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-y-8">
                <div>
                  <p className="text-gray-500 text-xs">Gender</p>
                  <p className="text-sm">Female</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Birthday</p>
                  <p className="text-sm">Oct 25, 1997</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Phone Number</p>
                  <p className="text-sm">{patientData.phone}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Address</p>
                  <p className="text-sm">Molyko, Gentle South</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">City</p>
                  <p className="text-sm">Buea</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Registration Date</p>
                  <p className="text-sm">
                    {moment(new Date()).format("MMM Do, YYYY")}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Last Appointment</p>
                  <p className="text-sm">
                    {moment(new Date("08/03/2020")).startOf("hour").fromNow()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Last Treatment</p>
                  <p className="text-sm">Malaria, Type A</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Doctor Notes */}
        <div className="xl:col-span-1 flex flex-col">
          <Card classes={"h-[361px]"}>
            <header className="flex justify-between mb-3 items-center">
              <h2 className="font-bold">Notes</h2>

              <p
                className="text-blue-500 hover:text-blue-600 hover:underline hover:cursor-pointer"
                disabled
              >
                See all
              </p>
            </header>

            {/* body */}
            <div className="rounded-lg mt-2 text-sm">
              <div className="relative">
                <textarea
                  name="doctorNotes"
                  id="doctorNotes"
                  cols="30"
                  rows="9"
                  className="rounded-lg w-full bg-slate-200 text-sm border-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                  placeholder="Enter your Note here..."
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
                {note && (
                  <button className="bg-blue-600 rounded-lg absolute bottom-4 right-3 text-white px-3 py-2">
                    Save Note
                  </button>
                )}
              </div>

              {/* Latest Note */}
              <div className="mt-2 text-gray-500">
                <h5 className="font-bold pb-2">Note 1</h5>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <IoPersonOutline className="text-blue-500" />
                    <p>Dr. Susane Nicole</p>
                  </div>

                  <div>
                    {moment(new Date("08/03/2022")).format("d MMM 'YY")}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Patient Files and Documents */}
        <div className="xl:col-span-1 order-2">
          <Card classes={"h-[361px]"}>
            <header className="flex justify-between mb-3 items-baseline">
              <h2 className="font-bold">Files / Documents </h2>

              <a className="text-blue-500 hover:text-blue-600 hover:underline hover:cursor-pointer text-sm flex items-baseline">
                <MdOutlineUploadFile className="text-blue-500 " />
                <span className="ml-1 text-sm">Add files</span>
              </a>
            </header>

            {/* body: list of files */}
            <div className=" overflow-auto h-[90%] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full border-gray-100 rounded-md border-2">
              {files.map((file, index) => (
                <Card
                  key={file.name + "#" + index}
                  classes={"my-1 flex items-center justify-between"}
                >
                  <div className="flex items-center gap-2">
                    <RiFileTextLine />
                    <span className="text-xs">{file.name}</span>
                  </div>
                  <div className="text-sm">{file.size}</div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Patient Summary */}
        <div className="col-span-2 order-1 xl:order-2 xl:col-span-full">
          <Card classes={"p-0"}>
            <GridComponent
              dataSource={patientSummary}
              allowPaging={true}
              pageSettings={{ pageSize: 7 }}
            >
              <ColumnsDirective>
                {console.log("inner width: ", windowSize.innerWidth)}
                {windowSize.innerWidth >= 1400 && (
                  <ColumnDirective
                    field="PatientID"
                    headerText="Patient ID"
                    width="100"
                  />
                )}
                {windowSize.innerWidth >= 1400 && (
                  <ColumnDirective field="Name" width="100" />
                )}
                <ColumnDirective
                  field="Gender"
                  width={windowSize.innerWidth >= 1400 ? 60 : 100}
                  textAlign={windowSize.innerWidth >= 1400 ? "right" : "left"}
                />
                <ColumnDirective
                  field="Age"
                  width="70"
                  textAlign="left"
                  valueAccessor={formatAgeColumn}
                />
                <ColumnDirective
                  field="BloodType"
                  headerText="Blood Type"
                  width="0"
                  textAlign="center"
                />
                <ColumnDirective field="Weight" width="60" />
                <ColumnDirective
                  field="BMI"
                  headerText="Body Mass Index"
                  width="100"
                  textAlign="center"
                />
                <ColumnDirective
                  field="BMIWeight"
                  headerText="BMI Weight"
                  width="100"
                  className="uppercase"
                  textAlign={windowSize.innerWidth >= 1400 ? "left" : "center"}
                  valueAccessor={formatBMIWeight}
                />
              </ColumnsDirective>
              <Inject services={[Page, Sort]} />
            </GridComponent>
          </Card>
        </div>
      </div>

      {/* Telegram FAB */}
      {/* <TelegramFAB actions={actions} /> */}

      {/* ChatBot */}
      <ChatBot

        // This appears as the header
        // text for the chat bot
        headerTitle={"To: " + patientData?.name}
        steps={steps}
        {...config}

      />
    </>
  );
}

PatientID.Layout = DashboardLayout;
