"use client";

import { Button } from "@/components/ui/button";
import { db } from "../../../../firebase.config"; // Adjust path as necessary
import { Input } from "@/components/ui/input";
import { setDoc, doc } from "firebase/firestore";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

// Async function to add a document to Firestore
const addDocument = async (data: any, id: string) => {
  try {
    const docRef = doc(db, "patients", id);
    await setDoc(docRef, data);
    console.log("Document written with ID: ", id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

interface Location {
  latitude: number | null;
  longitude: number | null;
}

// LoginPage Component
const LoginPage = () => {
  // State hooks for form inputs
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  const [status, setStatus] = useState({
    error: false,
    loading: false,
    success: false,
  });

  const addPatientIntoDB = async () => {
    try {
      await addDocument(
        {
          Name: name,
          ContactNo: number,
          Email: email,
          DOB: dob,
          Latitude: location.latitude,
          Longitude: location.longitude,
        },
        email, // Use email as document ID
      );
      setStatus({ error: false, loading: false, success: true });
    } catch (error) {
      console.log("Something went wrong.");
      setStatus({ error: true, loading: false, success: false });
    }
    setTimeout(() => {
      setStatus({ error: false, loading: false, success: false });
    }, 2000);
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      addPatientIntoDB();
    }
  }, [location]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log("error fetching latitude and longitude");
        },
      );
    } else {
      console.log("permission not allowed");
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setStatus({ error: false, loading: true, success: false });
    e.preventDefault();
    console.log(name, number, email, dob);
    getLocation();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Patient Sign Up</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your details below to register
        </p>

        {/* Name Input */}
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            onChange={(event) => setName(event.target.value)}
            type="text"
            id="name"
            placeholder="Enter Your Name"
            required
            className="mt-2"
          />
        </div>

        {/* Contact Number Input */}
        <div className="mb-4">
          <Label htmlFor="phone">Contact Number</Label>
          <Input
            onChange={(event) => setNumber(event.target.value)}
            type="tel"
            id="phone"
            placeholder="Enter Your Contact Number"
            required
            className="mt-2"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            id="email"
            placeholder="Enter Your Email"
            required
            className="mt-2"
          />
        </div>

        {/* DOB Input */}
        <div className="mb-6">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            onChange={(event) => setDob(event.target.value)}
            type="date"
            id="dob"
            placeholder="Enter Your Date Of Birth"
            required
            className="mt-2"
          />
        </div>

        {/* Submit Button */}
        <Button
          disabled={status.loading}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition duration-200">
          Sign Up with Google (Patients)
        </Button>

        {/* Status Messages */}
        {status.error && (
          <h1 className="p-2 mt-4 rounded-md bg-red-500 text-white text-center font-semibold">
            Something Went Wrong
          </h1>
        )}
        {status.success && (
          <h1 className="p-2 mt-4 rounded-md bg-green-500 text-white text-center font-semibold">
            Successfully Registered
          </h1>
        )}
        {status.loading && (
          <h1 className="p-2 mt-4 rounded-md bg-black-500 text-white text-center font-semibold">
            Loading...
          </h1>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
