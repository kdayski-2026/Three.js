import { useTexture } from '@react-three/drei';
import useGeometry from '../stores/useGeometry';
import useWalls from '../stores/useWalls';
import useFloor from '../stores/useFloor';
import { useControls } from 'leva';
import { useEffect } from 'react';

export default function Environment() {
  const geometry = useGeometry((state) => state.plane);
  const wallMaterial = useWalls((state) => state.material);
  const setWallTextures = useWalls((state) => state.setTextures);
  const setWallAttributes = useWalls((state) => state.setAttributes);
  const floorMaterial = useFloor((state) => state.material);
  const setFloorTextures = useFloor((state) => state.setTextures);
  const setFloorAttributes = useFloor((state) => state.setAttributes);
  const wallTextures = useTexture(
    {
      map: '/portfolio/environment/min/beige_wall_001_diff_1k.jpg',
      normalMap: '/portfolio/environment/min/beige_wall_001_nor_gl_1k.jpg',
      aoMap: '/portfolio/environment/min/beige_wall_001_arm_1k.jpg',
      roughnessMap: '/portfolio/environment/min/beige_wall_001_rough_1k.jpg',
    },
    () => {
      setWallTextures(wallTextures);
    },
  );
  const floorTextures = useTexture(
    {
      map: '/portfolio/environment/min/laminate_floor_02_diff_1k.jpg',
      normalMap: '/portfolio/environment/min/laminate_floor_02_nor_gl_1k.jpg',
      aoMap: '/portfolio/environment/min/laminate_floor_02_arm_1k.jpg',
      roughnessMap: '/portfolio/environment/min/laminate_floor_02_rough_1k.jpg',
    },
    () => {
      setFloorTextures(floorTextures);
    },
  );

  const { wallRoughness, wallMetalness, floorRoughness, floorMetalness } = useControls(
    'Walls & Floor',
    {
      wallRoughness: {
        value: 1,
        min: 0,
        max: 1,
      },
      wallMetalness: {
        value: 0.0,
        min: 0,
        max: 1,
      },
      floorRoughness: {
        value: 0.8,
        min: 0,
        max: 1,
      },
      floorMetalness: {
        value: 0.0,
        min: 0,
        max: 1,
      },
    },
  );

  useEffect(() => {
    if (wallRoughness || wallMetalness)
      setWallAttributes({ roughness: wallRoughness, metalness: wallMetalness });
  }, [wallRoughness, wallMetalness]);

  useEffect(() => {
    if (floorRoughness || floorMetalness)
      setFloorAttributes({ roughness: floorRoughness, metalness: floorMetalness });
  }, [floorRoughness, floorMetalness]);

  return (
    <group>
      {/* Back */}
      <mesh
        position={[0, 4.4, -5]}
        scale={[40, 20, 1]}
        material={wallMaterial}
        geometry={geometry}
        receiveShadow
      />
      {/* Left */}
      <mesh
        position={[-20, 4.4, 5]}
        scale={[20, 20, 1]}
        rotation-y={Math.PI * 0.5}
        material={wallMaterial}
        geometry={geometry}
      />
      {/* Floor */}
      <mesh
        position={[0, -5.6, 5]}
        scale={[40, 20, 1]}
        rotation-x={Math.PI * -0.5}
        material={floorMaterial}
        geometry={geometry}
        receiveShadow
      />
    </group>
  );
}
