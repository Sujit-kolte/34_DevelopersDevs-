"use client";
import { Button } from "@/components/ui/button";
type NotificationType = {
  Syntoms: string;
  patientEmail: string;
  patientName: string;
  targetLc: string;
  targetLng: string;
  time: Date;
};

const Notification = ({ notification }: { notification: NotificationType }) => {
  return (
    <div className="p-5 border-2 border-3rem m-3 ">
      {notification ? ( // Render notification if it exists
        <div>
          <p className="text-xl mx-2 my-1">
            <b>From:</b> {notification.patientName}
          </p>
          <p className="text-xl mx-2 my-1">
            <b>Sender Email:</b> {notification.patientEmail}
          </p>
          <p className="text-xl mx-2 my-1">
            <b>Distance:</b> {notification.targetLc} Km
          </p>
          <p className="text-xl mx-2 my-1">
            <b>Symptoms:</b> {notification.Syntoms}
          </p>
          <hr />
          <div className="flex gap-2 justify-start align-center mt-3">
            <Button size={"lg"}>Accept</Button>
            <Button size={"lg"}>Reject</Button>
          </div>
        </div>
      ) : (
        <p>No notifications available.</p> // Fallback if no notification data
      )}
    </div>
  );
};

export default Notification;
