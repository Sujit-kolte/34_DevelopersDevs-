"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useAppSelector } from "@/app/hooks";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase.config";

// Type definitions for nurse and location objects
type Location = {
  Latitude: number;
  Longitude: number;
  Email: string;
};

type Nurse = {
  id: string;
  Latitude: number;
  Longitude: number;
  Email: string;
};

type Target = {
  Email: string;
  Latitude: number;
  Longitude: number;
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
  const { Email, Latitude, Longitude } = useAppSelector(
    (state) => state.patient
  );
  const socket = useAppSelector((state) => state.socket);

  const sendRequestHandler = async () => {
    const target: Target = {
      Email,
      Latitude: +Latitude, // Ensure Latitude and Longitude are numbers
      Longitude: +Longitude,
    };

    // socket.emit("help", { Email, Latitude, Longitude });

    const nurses = await fetchAllNurses();

    // Map nurses to Location type
    const array: Location[] = nurses.map((val) => ({
      Latitude: val.Latitude,
      Longitude: val.Longitude,
      Email: val.Email,
    }));

    const sortedLocations = sortLocationsByProximity(array, target);
  };

  return (
    <div className="p-2">
      <Button onClick={sendRequestHandler}>Send </Button>
    </div>
  );
};

export default Page;
