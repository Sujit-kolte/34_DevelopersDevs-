"use client";
import Sidebar from "@/components/layout/SideBar";
import Portal from "@/components/portal/page";
import { useEffect, useState } from "react";

// Layout Component
export default function Layout({ children }: { children: React.ReactNode }) {
  const [heartBeat, setHeartBeat] = useState(90);
  const [isPortalOpen, setIsPortalOpen] = useState(false); // Start with portal closed
  const [countdown, setCountdown] = useState(10);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // To store the interval ID
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // Store the audio instance

  function getRandomNumber() {
    return Math.floor(Math.random() * (110 - 50 + 1)) + 50;
  }

  // Function to start heartbeat interval
  const startHeartbeatInterval = () => {
    const id = setInterval(() => {
      const newHeartRate = getRandomNumber();
      setHeartBeat(newHeartRate);
      console.log("New Heart Rate:", newHeartRate); // Print the new heart rate number

      // Open portal if heart rate is below 60 or above 100
      if (newHeartRate < 60 || newHeartRate > 100) {
        setIsPortalOpen(true);
        setCountdown(10); // Reset countdown whenever the portal opens
        clearInterval(id); // Stop the interval when the portal opens
        setIntervalId(null); // Clear the interval ID
        playBeepSound(); // Play beep sound
      }
    }, 5000);
    setIntervalId(id); // Save the interval ID
  };

  // Function to play beep sound
  const playBeepSound = () => {
    const newAudio = new Audio("/beep.mp3"); // Correct path to your sound file
    newAudio
      .play()
      .catch((error) => console.error("Error playing sound:", error));
    setAudio(newAudio); // Store the audio instance
  };

  // Heartbeat interval logic
  useEffect(() => {
    startHeartbeatInterval(); // Start the interval when the component mounts

    return () => {
      if (intervalId) clearInterval(intervalId); // Clear interval on cleanup
    };
  }, []); // Run only on mount

  // Countdown logic
  useEffect(() => {
    if (isPortalOpen && countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }

    // Automatically close the portal when countdown reaches 0
    if (countdown === 0) {
      setIsPortalOpen(false);
    }
  }, [isPortalOpen, countdown]);

  // Close the portal manually with the close button
  const handleClose = () => {
    setIsPortalOpen(false);
    setCountdown(10); // Reset countdown for future opening

    // Stop audio when the portal is closed
    if (audio) {
      audio.pause(); // Pause the audio
      audio.currentTime = 0; // Reset to the start if needed
    }
  };

  // Handle Request Help button click
  const handleRequestHelp = () => {
    alert("Requesting Help...");

    // Clear the heartbeat interval when the request help button is clicked
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null); // Reset the interval ID
    }
  };

  return (
    <div className="relative flex gap-2">
      {isPortalOpen && (
        <Portal className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark overlay background */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Portal content with shake animation */}
          <div className="relative bg-red-600 p-8 text-white rounded-lg shadow-lg z-10 shake">
            <h2 className="text-2xl font-bold mb-4">Heartbeat Alert!</h2>
            <h3 className="text-2xl font-bold mb-4">
              Current Heart Rate: {heartBeat}
            </h3>
            <h2 className="text-2xl font-bold mb-4">Countdown: {countdown}</h2>
            <p className="mb-4">
              The portal will close when the countdown reaches 0.
            </p>

            <div className="flex justify-between">
              <button
                onClick={handleRequestHelp}
                className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-md">
                Request Help
              </button>
              <button
                onClick={handleClose}
                className="bg-black text-white font-bold px-4 py-2 rounded-md">
                Close
              </button>
            </div>
          </div>
        </Portal>
      )}

      <Sidebar />
      {children}
    </div>
  );
}
