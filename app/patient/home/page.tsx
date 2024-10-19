"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase.config";
import Link from "next/link";
// import { sendVerificationEmail } from "@/nodemailer/nodemailer";
// Type definitions for nurse and location objects
type Location = {
  Latitude: number;
  Longitude: number;
  Email: string;
  Name: string;
};

type Nurse = {
  id: string;
  Latitude: number;
  Longitude: number;
  Email: string;
  Name: string;
};

type Target = {
  Email: string;
  Latitude: number;
  Longitude: number;
  Name: string;
};

// Function to calculate distance between two lat/lon points using Haversine formula
function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
}

// Function to sort locations based on proximity to the target location
function sortLocationsByProximity(
  locations: Location[],
  target: Target
): Location[] {
  const { Latitude, Longitude } = target;

  return locations.sort((a, b) => {
    const distanceA = getDistance(Latitude, Longitude, a.Latitude, a.Longitude);
    const distanceB = getDistance(Latitude, Longitude, b.Latitude, b.Longitude);
    return distanceA - distanceB; // Sort by closest distance
  });
}

// Async function to fetch all nurses from Firestore
const fetchAllNurses = async (): Promise<Nurse[]> => {
  const querySnapshot = await getDocs(collection(db, "nurse"));
  const nurses: Nurse[] = [];
  querySnapshot.forEach((doc) => {
    nurses.push({ id: doc.id, ...doc.data() } as Nurse); // Type assertion to Nurse
  });
  return nurses;
};

const Page: React.FC = () => {
  // Move useAppSelector hook calls into the component body
  const { Email, Latitude, Longitude, Name } = useAppSelector(
    (state) => state.patient
  );
  const socket = useAppSelector((state) => state.socket);
  const [sortedNurses, SetSortedNurses] = useState<{
    checked: boolean;
    nurses: any[];
  }>({ checked: false, nurses: [] });
  const sendRequestHandler = async () => {
    const target: Target = {
      Email,
      Latitude: +Latitude, // Ensure Latitude and Longitude are numbers
      Longitude: +Longitude,
      Name,
    };

    // socket.emit("help", { Email, Latitude, Longitude });

    const nurses = await fetchAllNurses();

    // Map nurses to Location type
    const array: Location[] = nurses.map((val) => ({
      Latitude: val.Latitude,
      Longitude: val.Longitude,
      Email: val.Email,
      Name: val.Name,
    }));

    const sortedLocations = sortLocationsByProximity(array, target);
    SetSortedNurses({ checked: true, nurses: [...sortedLocations] });
    console.log(sortedLocations);
    sortedLocations.forEach(async (val) => {
      // try {
      //   const res = await fetch("http://localhost/3000/sendEmail", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       email: val.Email,
      //       name: val.Name,
      //       pname: target.Email,
      //       pemail: target.Name,
      //     }),
      //   });
      //   const anotherRespones = await res.json();
      //   console.log(anotherRespones);
      //   console.log("response is a valid one");
      //   const response = await new Promise((resolve, rejected) => {
      //     setTimeout(() => {
      //       resolve("promise resolved");
      //     }, 30000);
      //   });
      // } catch (error) {
      //   console.log("something went wrong while transferring");
      // }
    });
  };

  return (
    <div className="p-2">
      <div className="w-full h-auto py-10 flex justify-center items-center flex-col gap-2 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6 tracking-wide">
          If In Serious Condition Click on the following provided button, to
          book appointment by the nearest available nurse
        </h1>
        <button
          onClick={sendRequestHandler}
          className="md:w-[50%] w-full bg-red-600 text-white font-bold py-2 px-8 text-xl tracking-wider rounded hover:bg-red-700 transition duration-200"
        >
          Help Me
        </button>
      </div>
      {sortedNurses.checked && sortedNurses.nurses.length === 0 && <h1></h1>}
      {sortedNurses.nurses.length !== 0 && sortedNurses.checked && (
        <div className="w-full p-2 flex justify-center items-center flex-col gap-2">
          {sortedNurses.nurses.map((value, index) => {
            {
              console.log(value);
            }
            return (
              <div
                key={`index is ${index}`}
                className="w-full flex justify-start items-start flex-col p-2 gap-2 rounded-md border-2 border-x-gray-100"
              >
                <h1>
                  Name:
                  <span className="font-bold tracking-wide ml-2">
                    {value.Name}
                  </span>
                </h1>
                <h1>
                  Email:
                  <span className="font-bold tracking-wide ml-2">
                    {value.Email}
                  </span>
                </h1>
                <Link
                  href={`/map/${value.Latitude}/${value.Longitude}`}
                  className="md:w-[50%] w-full p-2 rounded-md self-center text-center text-white bg-blue-500 font-bold tracking-wide"
                >
                  View Location Of {value.Name}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
