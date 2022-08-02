import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import * as faceapi from "face-api.js";

import idIcon from "@/assets/faceid.png";

import { GoLinkExternal } from "react-icons/go";
import { useTopLoader } from "@/contexts/LoadingContext";
import Transition from "../utils/Transition";

const Identification = () => {
  const [IdModal, setIdModal] = useState(false);
  const [fullname, setFullName] = useState("");
  const [nic, setNic] = useState("");
  const [age, setAge] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [myStream, setMyStream] = useState(null);
  const [faceDetections, setFaceDetections] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  const [labeledFaceDescriptors, setLabeledDesc] = useState(null);
  const [userInfo, setUserInfo] = useState([null]);

  const faceIdModal = useRef(null);
  const faceIdTrigger = useRef(null);

  const { setTopLoading, setComplete, topLoading } = useTopLoader();

  const labels = [
    {
      name: "Daniel",
      age: "20",
      nic: "110010292",
    },
    {
      name: "Fokou",
      age: "23",
      nic: "123413900",
    },
  ];

  //   video and face models
  const videoRef = useRef();
  const canvasRef = useRef();
  const vidWidth = 500;
  const vidHeight = 300;

  //   start video element
  useEffect(() => {
    if (IdModal) {
      setTimeout(() => {
        startVideoFootage();
        setOpenCamera(true);
      }, 2000);
    } else {
      closeCamera();
    }
  }, [IdModal]);

  // loadModels function
  useEffect(() => {
    setTopLoading(true);

    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      ]).then(async () => {
        setModelsLoaded(true);
        setLabeledDesc(await loadLabeledImages());
      });
    };

    loadModels();
  }, []);

  useEffect(() => {
    console.log("loading labeled images", topLoading);

    if (labeledFaceDescriptors !== null) {
      setComplete(true);
      setTopLoading(false);
      return;
    }
  }, []);

  //   start Video Footage function
  const startVideoFootage = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setMyStream(stream);
        videoRef.current.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const faceDetected = null;
  const maxDescriptorDistance = 0.6;

  // faceDetection function
  const faceDetection = () => {
    setInterval(async () => {
      // console.log("open camera", openCamera);
      if (canvasRef && canvasRef.current && videoRef && videoRef.current) {
        canvasRef.current.innerHtml = await faceapi.createCanvas(
          videoRef.current
        );

        faceapi.matchDimensions(canvasRef.current, {
          width: vidWidth,
          height: vidHeight,
        });

        faceDetected = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptor();

        if (faceDetected) {
          const resizedDimensions = faceapi.resizeResults(faceDetected, {
            width: vidWidth,
            height: vidHeight,
          });

          console.log(faceDetected);

          canvasRef &&
            canvasRef.current &&
            canvasRef.current
              .getContext("2d")
              .clearRect(0, 0, vidWidth, vidHeight);

          // draw the faceDetected in the detected face box
          canvasRef &&
            canvasRef.current &&
            faceapi.draw.drawDetections(canvasRef.current, resizedDimensions);

          // draw the marks on the detected face
          canvasRef &&
            canvasRef.current &&
            faceapi.draw.drawFaceLandmarks(
              canvasRef.current,
              resizedDimensions
            );

          const faceMatcher = new faceapi.FaceMatcher(
            labeledFaceDescriptors,
            maxDescriptorDistance
          );

          console.log("dimensions", resizedDimensions);

          const result = faceMatcher.findBestMatch(
            resizedDimensions.descriptor
          );

          console.log("draw avail", result);

          const myBox = new faceapi.draw.DrawBox(
            resizedDimensions.detection.box,
            {
              label: result.label,
            }
          );

          myBox?.draw(canvasRef.current);

          result?.label &&
            setUserInfo(labels.filter((label) => label.name === result.label));

          console.log("user info: ", userInfo);
        }
      }
    }, 100);
  };

  // load labeled images => recognition
  const loadLabeledImages = () => {
    return Promise.all(
      labels.map(async (label) => {
        const faceDescriptors = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`/faces/${label.name}/${i}.png`);

          const fullFaceDescription = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!fullFaceDescription) {
            throw new Error(`no faces detected for ${label.name}`);
          }

          faceDescriptors = [fullFaceDescription.descriptor];
        }

        return new faceapi.LabeledFaceDescriptors(label.name, faceDescriptors);
      })
    );
  };

  const closeCamera = () => {
    videoRef.current?.pause();
    videoRef.current?.srcObject.getTracks()[0].stop();
    setOpenCamera(false);
  };

  // set user info fields
  useEffect(() => {
    console.log("userInfo effect: ", userInfo);
    setFullName(userInfo[0]?.name);
    setNic(userInfo[0]?.nic);
    setAge(userInfo[0]?.age);
    videoRef.current?.pause();
    clearInterval(faceDetection);
  }, [userInfo]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!IdModal || keyCode !== 27) return;
      setIdModal(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !IdModal ||
        faceIdModal.current.contains(target) ||
        faceIdTrigger.current.contains(target)
      )
        return;
      setIdModal(false);
      closeCamera();
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // console.log("videoRef: ", videoRef.current);

  return (
    <div className="relative inline-flex mr">
      <button
        ref={faceIdTrigger}
        className={`flex items-center justify-center  hover:bg-slate-200 w-10 h-10 transition duration-150 rounded-full`}
        onClick={() => setIdModal(!IdModal)}
      >
        <span className="sr-only">Face Identification</span>
        <Image src={idIcon} width="25" height="25" className="" />
      </button>

      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={IdModal}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />

      <Transition
        id="id-modal"
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={IdModal}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={faceIdModal}
          className="bg-white overflow-auto max-w-3xl w-full max-h-full rounded shadow-lg p-5"
        >
          <div className="w-full grid grid-cols-3 gap-4">
            <div className="col-span-2">
              {!openCamera ? (
                <p>Loading...</p>
              ) : (
                <video
                  crossOrigin="anonymous"
                  ref={videoRef}
                  autoPlay
                  onPlay={openCamera ? faceDetection : null}
                ></video>
              )}

              <canvas
                ref={canvasRef}
                width={vidWidth}
                height={vidHeight}
                className="absolute top-10"
              ></canvas>
            </div>

            <div>
              <h3 className="text-xl font-bold pb-3">User Info</h3>
              <form>
                <div>
                  <label className="block text-sm mb-1" htmlFor="fullname">
                    Full Name
                  </label>
                  <input
                    id="fullname"
                    className="form-input w-full"
                    type="text"
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="off"
                    value={fullname}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" htmlFor="nic">
                    NIC
                  </label>
                  <input
                    id="nic"
                    className="form-input w-full"
                    type="text"
                    onChange={(e) => setNic(e.target.value)}
                    autoComplete="off"
                    value={nic}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1" htmlFor="dob">
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    className="form-input w-full"
                    type="text"
                    onChange={(e) => setAge(e.target.value)}
                    autoComplete="off"
                    disabled
                    value={age}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-5 bg-gray-800 text-gray-400 hover:bg-gray-900 hover:text-gray-300 duration-150 px-4 py-3 rounded-md flex items-center float-right"
                >
                  View Profile <GoLinkExternal className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Identification;
