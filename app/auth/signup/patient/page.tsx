"use client";

import { Button } from "@/components/ui/button"; // Importing a custom Button component
import { db } from "../../../../firebase.config"; // Firebase configuration (adjust path if necessary)
import { Input } from "@/components/ui/input"; // Importing a custom Input component
import { setDoc, doc } from "firebase/firestore"; // Firestore methods to add document and reference a doc
import { Label } from "@/components/ui/label"; // Importing a custom Label component
import { useEffect, useState } from "react"; // React hooks for state and lifecycle management

// Async function to add a document to Firestore database
const addDocument = async (data: any, id: string) => {
  try {
    // Create a reference to the "nurse" collection with the document ID as the email
    const docRef = doc(db, "nurse", id);
    await setDoc(docRef, data); // Add the document to Firestore
    console.log("Document written with ID: ", id);
  } catch (e) {
    console.error("Error adding document: ", e); // Handle any errors during the process
  }
};

// Interface for managing location state (latitude and longitude)
interface Location {
  latitude: number | null;
  longitude: number | null;
}

const LoginPage = () => {
  // State hooks for form inputs and managing the user's information
  const [name, setName] = useState(""); // Name input
  const [number, setNumber] = useState(""); // Contact number input
  const [email, setEmail] = useState(""); // Email input
  const [dob, setDob] = useState(""); // Date of birth input
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  }); // Location input for storing latitude and longitude
  const [status, setStatus] = useState({
    error: false,
    loading: false,
    success: false,
  }); // Status for tracking errors, loading, and success messages

  // Function to add nurse data into the Firestore database
  const addPatientIntoDB = async () => {
    try {
      // Call the addDocument function with nurse details
      await addDocument(
        {
          Name: name,
          ContactNo: number,
          Email: email,
          DOB: dob,
          Latitude: location.latitude,
          Longitude: location.longitude,
          TotalNoOfPatientsAppeared: 0, // Additional nurse data
          AverageRating: 0,
          requestAccepted: 0,
          isAvailable: true,
        },
        email, // Use the email as the document ID
      );
      // If successful, update the status to success
      setStatus({ error: false, loading: false, success: true });
    } catch (error) {
      console.log("Something went wrong.");
      setStatus({ error: true, loading: false, success: false }); // Handle errors during the process
    }
    // Reset status messages after 2 seconds
    setTimeout(() => {
      setStatus({ error: false, loading: false, success: false });
    }, 2000);
  };

  // Effect hook that runs when location changes and adds the patient into the DB
  useEffect(() => {
    if (location.latitude && location.longitude) {
      addPatientIntoDB();
    }
  }, [location]);

  // Function to get the user's current location (geolocation)
  const getLocation = () => {
    if (navigator.geolocation) {
      // Use browser's geolocation API to get the position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Set latitude and longitude
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Error fetching latitude and longitude"); // Handle any errors fetching location
        },
      );
    } else {
      console.log("Permission not allowed"); // If geolocation permission is denied
    }
  };

  // Form submission handler
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setStatus({ error: false, loading: true, success: false }); // Set loading state
    e.preventDefault(); // Prevent default form submission
    console.log(name, number, email, dob); // Log the user's details
    getLocation(); // Fetch the user's location
  };

  return (
    <>
      {/* Center the form on the page with a background color */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* Form to handle nurse registration */}
        <form
          onSubmit={(event) => submitHandler(event)}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Nurse Sign Up</h1>
          <p className="text-center text-gray-600 mb-6">
            Enter your details below to register
          </p>

          {/* Name Input */}
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              onChange={(event) => setName(event.target.value)} // Update name state on input change
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
              onChange={(event) => setNumber(event.target.value)} // Update contact number state
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
              onChange={(event) => setEmail(event.target.value)} // Update email state
              type="email"
              id="email"
              placeholder="Enter Your Email"
              required
              className="mt-2"
            />
          </div>

          {/* Date of Birth Input */}
          <div className="mb-6">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              onChange={(event) => setDob(event.target.value)} // Update DOB state
              type="date"
              id="dob"
              placeholder="Enter Your Date Of Birth"
              required
              className="mt-2"
            />
          </div>

          {/* Submit Button */}
          <Button
            disabled={status.loading} // Disable the button when loading
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition duration-200">
            Sign Up with Google (Nurse)
          </Button>

          {/* Error message if something goes wrong */}
          {status.error && (
            <h1 className="p-2 mt-4 rounded-md bg-red-500 text-white text-center font-semibold">
              Something Went Wrong
            </h1>
          )}

          {/* Success message if registration is successful */}
          {status.success && (
            <h1 className="p-2 mt-4 rounded-md bg-green-500 text-white text-center font-semibold">
              Successfully Registered
            </h1>
          )}

          {/* Loading state message */}
          {status.loading && (
            <h1 className="p-2 mt-4 rounded-md bg-black-500 text-white text-center font-semibold">
              Loading...
            </h1>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
