import {
  PresentationControls,
  useGLTF,
  Environment,
  Float,
  ContactShadows,
  OrbitControls,
} from '@react-three/drei';
import Notebook from './Notebook/Notebook';
import Table from './Table/Table';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';

export default function Experience() {
  const { orbit } = useControls('Controls', { orbit: true });
  const { environment } = useControls('Environment', { environment: false });

  return (
    <>
      <Perf position="top-left" />

      <Environment files="./portfolio/potsdamer_platz_1k.hdr" background={environment} />

      <color args={['#1d1a24']} attach="background" />

      {orbit && <OrbitControls />}

      <PresentationControls
        global
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        damping={0.1}
        snap
        enabled={!orbit}
      >
        <Notebook />
        <Table />
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}

useGLTF.preload('./macbook_model.gltf');
