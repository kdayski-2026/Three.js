import { useEffect, useState, useRef } from 'react';

export default function Clicker({ keyName, color, increment }) {
  const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0));
  const buttonRef = useRef();

  const click = () => {
    setCount((prev) => ++prev);
    increment();
  };

  useEffect(() => {
    localStorage.setItem(keyName, count);
  }, [count]);

  useEffect(() => {
    buttonRef.current.style.backgroundColor = 'papayawhip';
    buttonRef.current.style.color = 'salmon';

    return () => {
      localStorage.removeItem(keyName);
    };
  }, []);

  return (
    <div>
      <div style={{ color }}>Clicks count: {count}</div>
      <button ref={buttonRef} onClick={click}>
        Click me
      </button>
    </div>
  );
}
