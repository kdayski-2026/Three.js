import './app.css';
import { useEffect, useState } from 'react';
import Scene55 from './55/Scene';
import Scene56 from './56/Scene';
import Scene57 from './57/Scene';
import Scene58 from './58/Scene';
import Scene59 from './59/Scene';
import Scene60 from './60/Scene';
import Scene61 from './61/Scene';
import Scene62 from './62/Scene';
import Scene63 from './63/Scene';
import Scene64 from './64/Scene';
import Scene65 from './65/Scene';
import Scene66 from './66/Scene';

export default function App() {
  const scenes = {
    55: <Scene55 />,
    56: <Scene56 />,
    57: <Scene57 />,
    58: <Scene58 />,
    59: <Scene59 />,
    60: <Scene60 />,
    61: <Scene61 />,
    62: <Scene62 />,
    63: <Scene63 />,
    64: <Scene64 />,
    65: <Scene65 />,
    66: <Scene66 />,
  };
  const [activeTab, setActiveTab] = useState(55);
  const tabs = [
    { id: 55, name: '55-first-r3f-application', bg: 'lightskyblue' },
    { id: 56, name: '56-r3f-drei' },
    { id: 57, name: '57-debug-a-r3f-application' },
    { id: 58, name: '58-environment-and-staging-with-r3f', bg: 'unset' },
    { id: 59, name: '59-load-models-with-r3f' },
    { id: 60, name: '60-3d-text-with-r3f' },
    { id: 61, name: '61-portal-scene-with-r3f' },
    { id: 62, name: '62-mouse-events-with-r3f' },
    { id: 63, name: '63-post-processing-with-r3f' },
    { id: 64, name: '64-fun-and-simple-portfolio-with-r3f', bg: '#1d1a24' },
    { id: 65, name: '65-physics-with-r3f' },
    { id: 66, name: '66-create-a-game-with-r3f' },
  ];

  const handleTab = (id) => {
    setActiveTab(id);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--root-bg', tabs.find(({ id }) => id === activeTab)['bg'] || 'ivory');
  }, [activeTab]);

  return (
    <>
      <div className="top-bar">
        <div className="tabs">
          {tabs.map(({ id, name }) => (
            <div key={id} className={`tab ${activeTab === id ? 'active' : ''}`} onClick={() => handleTab(id)}>
              {name}
            </div>
          ))}
        </div>
      </div>
      {scenes[activeTab]}
    </>
  );
}
