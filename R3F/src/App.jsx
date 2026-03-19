import './app.css';
import { useEffect } from 'react';
import { useControls } from 'leva';
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
  const scenes = [
    { id: 55, name: '55-first-r3f-application', bg: 'lightskyblue', scene: <Scene55 /> },
    { id: 56, name: '56-r3f-drei', scene: <Scene56 /> },
    { id: 57, name: '57-debug-a-r3f-application', scene: <Scene57 /> },
    { id: 58, name: '58-environment-and-staging-with-r3f', bg: 'unset', scene: <Scene58 /> },
    { id: 59, name: '59-load-models-with-r3f', scene: <Scene59 /> },
    { id: 60, name: '60-3d-text-with-r3f', scene: <Scene60 /> },
    { id: 61, name: '61-portal-scene-with-r3f', scene: <Scene61 /> },
    { id: 62, name: '62-mouse-events-with-r3f', scene: <Scene62 /> },
    { id: 63, name: '63-post-processing-with-r3f', scene: <Scene63 /> },
    { id: 64, name: '64-fun-and-simple-portfolio-with-r3f', bg: '#1d1a24', scene: <Scene64 /> },
    { id: 65, name: '65-physics-with-r3f', scene: <Scene65 /> },
    { id: 66, name: '66-create-a-game-with-r3f', scene: <Scene66 /> },
  ];

  const { name } = useControls('Project', {
    name: { options: scenes.map((item) => item.name) },
  });

  useEffect(() => {
    const id = name.split('-')[0];
    document.documentElement.style.setProperty(
      '--root-bg',
      scenes.find((item) => item.id == id)['bg'] || 'ivory',
    );
  }, [name]);

  return <>{scenes.find(({ id }) => id == name.split('-')[0]).scene}</>;
}
