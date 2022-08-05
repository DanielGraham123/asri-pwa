import Image01 from "@/assets/user-36-05.jpg";
import Image02 from "@/assets/user-36-06.jpg";
import Image03 from "@/assets/user-36-07.jpg";
import Image04 from "@/assets/user-36-08.jpg";
import moment from "moment";

export default {
  id: 2029,
  createdAt: "2013/12/20",
  updatedAt: "2013/12/20",
  birthdate: "1980/10/20",
  image: Image01,
  illnesses: [
    {
      id: "IL2983",
      illness_type_id: "IL2983",
      name: "Typhoid with Stomach Ache",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum eius exercitationem dignissimos omnis, corrupti quaerat dolore, assumenda vel suscipit, nam deleniti atque reiciendis voluptatum repudiandae. Perferendis incidunt eveniet consequatur, sit molestiae natus.",
      startDate: "2013/12/20",
      endDate: "2013/12/25",
      createdAt: "2013/12/25",
      updatedAt: "2013/12/25",
      bioData: {
        height: "1.32",
        weight: "50",
      },
      // prior medications taken
      medicationsTaken: [
        {
          id: "MED2929",
          name: "Fever grass",
          startDate: "2013/12/21",
          endDate: "2013/12/25",
        },
        {
          id: "MED2920",
          name: "Lemon juice",
          startDate: "2013/12/21",
          endDate: "2013/12/25",
        },
        {
          id: "MED2921",
          name: "Palm Oil",
          startDate: "2013/12/21",
          endDate: "2013/12/25",
        },
      ],
      stage: ["advanced", "severe", "light"],
      doctor: {
        id: "DOC293829",
        name: "Dr. Stephane",
        phone: "+237 658 494 938",
        email: "stephane@gmail.com",
        hospital_name: "Buea, Hospital",
        specialty: "Medical",
      },
    },
    {
      id: "IL7883",
      illness_type_id: "IL2983",
      name: "Malaria",
      startDate: "2013/12/20",
      endDate: "2013/12/25",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum eligendi obcaecati perspiciatis asperiores maxime. Eius? obcaecati perspiciatis asperiores maxime. Eius? obcaecati perspiciatis asperiores maxime. Eius? obcaecati perspiciatis asperiores maxime. Eius? obcaecati perspiciatis asperiores maxime. Eius?",
      createdAt: "2013/12/25",
      updatedAt: "2013/12/25",
      // prior medications taken
      bioData: {
        height: "1.32",
        weight: "50",
      },
      medicationsTaken: [
        {
          id: "MED2929",
          name: "Fever grass",
          startDate: "2013/12/21",
          endDate: "2013/12/25",
        },
        {
          id: "MED2929",
          name: "Lemon juice",
          startDate: "2013/12/21",
          endDate: "2013/12/25",
        },
        {
          id: "MED2929",
          name: "Palm Oil",
          startDate: "2013/12/21",
          endDate: "2013/12/25",
        },
      ],
      stage: ["light", "severe", "light"],
      doctor_id: "DOC293829",
      doctor: {
        name: "Dr. Jean Baptist",
        phone: "+237 658 494 938",
        email: "stephane@gmail.com",
        hospital_name: "Regional Hospital",
        specialty: "Medical",
      },
    },
  ],
  prescriptions: [
    {
      id: "PRSC7898",
      illness_type_id: "IL2983",
      startDate: "2013/12/21",
      title: `${moment(new Date("2013/12/21").getTime()).calendar()}`,

      endtDate: "2013/12/24",
      drugs: [
        {
          name: "Arthemeter",
          intakeFreq: "1,1,1",
        },
        {
          name: "Injections",
          intakeFreq: "1,1,1",
        },
        {
          name: "Paracet",
          intakeFreq: "2,2,2",
        },
        {
          name: "Doliprane",
          intakeFreq: "1,1",
        },
      ],
    },
    {
      id: "PRSC9098",
      illness_type_id: "IL2986",
      startDate: "2013/12/21",
      title: "On 2013/12/21",

      endtDate: "2013/12/24",
      drugs: [
        {
          name: "Arthemeter",
          intakeFreq: "1,1,1",
        },
        {
          name: "Paracet",
          intakeFreq: "2,2,2",
        },
        {
          name: "Doliprane",
          intakeFreq: "1,1",
        },
      ],
    },
    {
      id: "PRSC9998",
      illness_type_id: "IL2986",
      startDate: "2013/12/21",
      title: "On 2013/12/21",
      endtDate: "2013/12/24",
      drugs: [
        {
          name: "Arthemeter",
          intakeFreq: "1,1,1",
        },
        {
          name: "Paracet",
          intakeFreq: "2,2,2",
        },
        {
          name: "Doliprane",
          intakeFreq: "1,1",
        },
      ],
    },
  ],
  treatements: [
    {
      id: "TRT2998",
      treatment_type_id: "TRT2998",
      treatement_name: "Malaria Treatment",
      startDate: "2012/10/1",
      endDate: "2012/12/3",
      rdv: "2012/12/14",
    },
    {
      id: "TRT3995",
      treatment_type_id: "TRT3995",
      treatement_name: "Typhoid Treatment",
      startDate: "2012/10/1",
      endDate: "2012/12/3",
      rdv: "2012/12/18",
    },
  ],
};
