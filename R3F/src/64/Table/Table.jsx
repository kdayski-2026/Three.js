import { useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import { SRGBColorSpace } from 'three';
import Cup from './Cup';

export default function Table() {
  const props = useTexture({
    map: '/portfolio/table/wood_table_001_diff_1k.jpg',
    normalMap: '/portfolio/table/wood_table_001_nor_gl_1k.jpg',
    aoMap: '/portfolio/table/wood_table_001_arm_1k.jpg',
    roughnessMap: '/portfolio/table/wood_table_001_rough_1k.jpg',
  });
  props.map.colorSpace = SRGBColorSpace;

  const { roughness, metalness } = useControls('Table', {
    roughness: {
      value: 0.8,
      min: 0,
      max: 1,
      step: 0.01,
    },
    metalness: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  return (
    <group>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 0.1, 2.5]} />
        <meshStandardMaterial {...props} roughness={roughness} metalness={metalness} />
      </mesh>
      <Cup />
    </group>
  );
}
