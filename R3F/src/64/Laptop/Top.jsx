import Frame from './Frame';

export default function Top({ top, isOpen }) {
  return (
    <primitive rotation-x={Math.PI * 0.5} object={top} position={[0, -0.5, -0.345]} scale={10}>
      {isOpen && <Frame />}
    </primitive>
  );
}
