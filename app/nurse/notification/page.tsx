"use client";
import Notification from "./Notification";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

type NotificationType = {
  Syntoms: string;
  patientEmail: string;
  patientName: string;
  targetLc: string;
  targetLng: string;
  time: Date; // Ensure time is a Date object
};

const Page: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationType[] | null>(
    null,
  );

  const fetchNotifications = async (
    email: string,
  ): Promise<NotificationType[] | null> => {
    const docRef = doc(db, "notifications", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      const data = docSnap.data();

      // Map the Firestore data to NotificationType array, converting time to Date
      const notifications = data.notifications.map((notification: any) => ({
        ...notification,
        time: new Date(notification.time), // Ensure time is a Date object
      })) as NotificationType[];

      return notifications;
    } else {
      console.log("No such document!");
      return null;
    }
  };

  const fetches = async () => {
    const user = auth.currentUser;
    console.log(user);
    if (user && user.email) {
      const notifications = await fetchNotifications(user.email);
      setNotifications(notifications);
    }
  };

  useEffect(() => {
    fetches();
  }, []);

  return (
    <div className="flex flex-wrap h-min ">
      {notifications ? (
        notifications.map((val: NotificationType, index: number) => (
          <Notification key={index} notification={val} />
        ))
      ) : (
        <p className="p-2 text-center m-2 font-mono">No Notifications yet</p>
      )}
    </div>
  );
};

export default Page;
