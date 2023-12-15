/**
 * CountUpNumber Component
 *
 * Props:
 * - endValue: The final value to which the component will count.
 * - duration: The duration (in milliseconds) in which the counting animation will occur.
 */

import { FC, useEffect, useState } from "react";

type Props = {
  endValue: number;
  duration: number;
};

/**
 * CountUpNumber Functional Component
 * @param {Props} Props - Object containing endValue and duration props.
 * @returns JSX.Element - A paragraph element displaying the counting animation.
 */
const CountUpNumber: FC<Props> = ({ endValue, duration }) => {
  // State to hold the current count
  const [count, setCount] = useState(0);

  // Effect hook to handle counting animation
  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    // Function to update the count based on timestamp
    const updateCount = (timestamp: number) => {
      // Set startTime if it's not defined
      if (!startTime) startTime = timestamp;

      // Calculate the progress of the animation
      const progress = timestamp - startTime;

      // Update count if the progress is within the duration
      if (progress < duration) {
        setCount(Math.min(endValue, (progress / duration) * endValue));
        // Request the next frame for the animation
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        // Set the count to the final value once duration is reached
        setCount(endValue);
      }
    };

    // Initiate the animation by requesting the first frame
    animationFrameId = requestAnimationFrame(updateCount);

    // Clean up function to cancel animation frame on unmount or changes in props
    return () => cancelAnimationFrame(animationFrameId);
  }, [endValue, duration]);

  // Render the count within a paragraph element
  return (
    <p className="md:font-bold font-medium text-lg xl:text-5xl">
      {Math.round(count)}
    </p>
  );
};

export default CountUpNumber;
