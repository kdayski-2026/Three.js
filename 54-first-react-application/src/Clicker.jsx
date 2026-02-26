import { useEffect, useState } from 'react';

export default function Clicker() {
  const [count, setCount] = useState(parseInt(localStorage.getItem('count') ?? 0));

  const click = () => {
    setCount((prev) => ++prev);
  };

  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('count');
    };
  }, []);

  return (
    <div>
      <div>Clicks count: {count}</div>
      <button onClick={click}>Click me</button>
    </div>
  );
}
