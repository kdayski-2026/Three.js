import { ContactShadows } from '@react-three/drei';
import Table from './Table/Table';
import { Perf } from 'r3f-perf';
import Lights from './Lights';
import Controls from './Controls';
import { useControls } from 'leva';

export default function Experience() {
  const { backgroundColor } = useControls('Lights', {
    backgroundColor: '#1d1a24',
  });

  return (
    <>
      <Perf position="top-left" />

      <color args={[backgroundColor]} attach="background" />

      <Controls>
        <Lights />
        <Table />
      </Controls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
