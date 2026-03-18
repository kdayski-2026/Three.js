import { Physics } from '@react-three/rapier';
import Lights from './Lights.jsx';
import { BlockAxe, BlockLimbo, BlockSpinner, Level } from './Level.jsx';
import Player from './Player.jsx';
import useGame from './stores/useGame.js';

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blockSeed = useGame((state) => state.blockSeed);

  return (
    <>
      <color args={['#bdedfc']} attach="background" />

      <Physics debug={false}>
        <Lights />
        <Level count={blocksCount} types={[BlockSpinner, BlockLimbo, BlockAxe]} seed={blockSeed} />
        <Player />
      </Physics>
    </>
  );
}
