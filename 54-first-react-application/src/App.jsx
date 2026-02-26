import { useState } from 'react';
import Clicker from './Clicker';

export default function App() {
  const [hasClicker, setHasClicker] = useState(true);

  const toggleClickerClick = () => {
    setHasClicker((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleClickerClick}>{hasClicker ? 'Hide' : 'Show'} Clicker</button>
      {hasClicker && <Clicker />}
    </>
  );
}
