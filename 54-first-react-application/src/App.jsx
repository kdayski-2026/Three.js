import { useMemo, useState } from 'react';
import Clicker from './Clicker';
import People from './People';

export default function App({ children, clickersCount }) {
  const [hasClicker, setHasClicker] = useState(true);
  const [count, setCount] = useState(0);

  const toggleClickerClick = () => {
    setHasClicker((prev) => !prev);
  };

  const increment = () => {
    setCount((prev) => ++prev);
  };

  const colors = useMemo(() => {
    const colors = [];
    for (let i = 0; i < clickersCount; i++) {
      colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`);
    }
    return colors;
  }, [clickersCount]);

  return (
    <>
      {children}

      <div>Total count: {count}</div>

      <button onClick={toggleClickerClick}>{hasClicker ? 'Hide' : 'Show'} Clicker</button>
      {hasClicker && (
        <>
          {[...Array(clickersCount)].map((_, index) => (
            <Clicker key={index} keyName={`count${index}`} color={colors[index]} increment={increment} />
          ))}
        </>
      )}
      <People />
    </>
  );
}
