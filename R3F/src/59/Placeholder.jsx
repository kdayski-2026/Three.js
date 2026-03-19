export default function Placeholder({ mesh, geometry, material }) {
  return (
    <mesh position-y={0.5} scale={[2, 3, 2]} {...mesh}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} {...geometry} />
      <meshBasicMaterial wireframe color={'red'} {...material} />
    </mesh>
  );
}
