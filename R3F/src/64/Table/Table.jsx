import { useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect } from 'react';
import useTable from '../stores/useTable.js';
import useMesh from '../stores/useMesh.js';

export default function Table() {
  const geometry = useMesh((state) => state.geometry);
  const material = useTable((state) => state.material);
  const setTextures = useTable((state) => state.setTextures);
  const setAttributes = useTable((state) => state.setAttributes);
  const textures = useTexture(
    {
      map: '/portfolio/table/wood_table_001_diff_1k.jpg',
      normalMap: '/portfolio/table/wood_table_001_nor_gl_1k.jpg',
      aoMap: '/portfolio/table/wood_table_001_arm_1k.jpg',
      roughnessMap: '/portfolio/table/wood_table_001_rough_1k.jpg',
    },
    () => {
      setTextures(textures);
    },
  );

  const { roughness, metalness } = useControls('Table', {
    roughness: {
      value: 0.8,
      min: 0,
      max: 1,
      step: 0.01,
    },
    metalness: {
      value: 0.0,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  useEffect(() => {
    if (roughness || metalness) setAttributes({ roughness, metalness });
  }, [roughness, metalness]);

  return (
    <group>
      <mesh
        position={[0, -0.5, 0]}
        scale={[4, 0.1, 2.5]}
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
      />
      <mesh
        position={[0, -1.55, -1.2]}
        rotation-x={Math.PI * 0.5}
        scale={[4, 0.1, 2]}
        receiveShadow
        geometry={geometry}
        material={material}
      />
      <mesh
        position={[-1.95, -1.55, 0]}
        rotation-z={Math.PI * 0.5}
        scale={[2, 0.1, 2.5]}
        castShadow
        geometry={geometry}
        material={material}
      />
      <mesh
        position={[1.95, -1.55, 0]}
        rotation-z={Math.PI * 0.5}
        scale={[2, 0.1, 2.5]}
        receiveShadow
        geometry={geometry}
        material={material}
      />
    </group>
  );
}
