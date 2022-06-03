
import React, { useRef, useState, useEffect } from 'react'


const useThrottle = (value: any, limit: any) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastRan = useRef(Date.now());
  
    useEffect(() => {
      const handler = setTimeout(function() {
        if (Date.now() - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = Date.now();
        }
      }, limit - (Date.now() - lastRan.current));
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, limit]);
  
    return throttledValue;
};



export default useThrottle;