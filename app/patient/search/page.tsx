"use client";
import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase.config";
import Card from "../Card"; // Ensure you have the correct import for the Card component

// Define a type for Nurse
interface Nurse {
  id: string;
  Name: string;
  ContactNo: string;
  Email: string;
  isAvailable: boolean;
}

const Page: React.FC = () => {
  const [nurses, setNurses] = useState<Nurse[]>([]); // Initialize as an empty array of Nurse type

  const fetchAllNurses = async () => {
    const querySnapshot = await getDocs(collection(db, "nurse"));
    const documents: Nurse[] = []; // Initialize as an array of Nurse type
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() } as Nurse); // Type assertion to Nurse
    });
    setNurses(documents); // Set nurses to the fetched documents
  };

  useEffect(() => {
    fetchAllNurses();
  }, []);

  return (
    <div className="w-full grid grid-cols-1  md:grid-cols-2 place-content-start place-items-center ">
      {nurses.length > 0 &&
        nurses.map((val) => (
          <Card
            key={val.id} // Use the document id as the key
            Name={val.Name}
            ContactNo={val.ContactNo}
            Email={val.Email}
            isAvailable={val.isAvailable}
          />
        ))}
    </div>
  );
};

export default Page;
