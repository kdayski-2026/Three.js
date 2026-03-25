import WorkSpace from './WorkSpace/WorkSpace';
import { Perf } from 'r3f-perf';
import Controls from './Controls';

export default function Experience() {
  return (
    <>
      {/* <Perf position="top-left" /> */}

      <Controls>
        <WorkSpace />

        {/* lookAt */}
        {/* <mesh rotation-x={Math.PI * -0.5} scale={0.1}>
          <planeGeometry />
          <meshBasicMaterial />
        </mesh> */}
      </Controls>
    </>
  );
}
