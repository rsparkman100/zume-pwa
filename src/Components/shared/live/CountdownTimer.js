import React, { useState, useEffect } from 'react';

/**
 * A timer component that receives the number of minutes it should countdown from.
 * Internally, it counts down in seconds.
 */
export default function CountdownTimer({ minutes }) {
  let [remaining, setRemaining] = useState(minutes * 60);
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((remaining) => remaining - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [minutes]);

  const { negative, fm, fs } = formatRemainingTime(remaining);
  return <span>{`${negative ? '-' : ''}${fm}:${fs}`}</span>;
}

function formatRemainingTime(seconds) {
  let negative = false;
  if (seconds < 0) {
    negative = true;
    seconds *= -1;
  }
  // TODO resolve bug in negative because when negative round needs to do the opposite.
  // -3:29 goes to -4:30 (it's off)

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  let fm = m < 10 ? `0${m}` : m,
    fs = s < 10 ? `0${s}` : s;
  return { negative, fm, fs };
}
