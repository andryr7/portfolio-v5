import { useState, useEffect } from "react";

function useTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Function to update the time every second
    const tick = () => {
      const parisTime = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Paris",
      });
      setTime(new Date(parisTime));
    };

    // Set interval to update the time every 1000 ms (1 second)
    const intervalId = setInterval(tick, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Return the current Paris time value
  return time;
}

export default useTime;
