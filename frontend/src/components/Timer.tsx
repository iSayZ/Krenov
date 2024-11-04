import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialMinutes: number; // Optional, to set the initial number of minutes
  color: string; // Set color to render text
  onTimeout: () => void; // Callback function to call when the time is up
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, color, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialMinutes * 60); // Convert minutes to seconds

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerId);
          onTimeout(); // Call the callback function when the time expires
          return 0;
        }
        return prevTime - 1; // Decrement the time
      });
    }, 1000); // Update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  // Format the remaining time
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className={`text- inline-block${color}`}>
      <h2>{formatTimeLeft()}</h2>
    </div>
  );
};

export default Timer;
