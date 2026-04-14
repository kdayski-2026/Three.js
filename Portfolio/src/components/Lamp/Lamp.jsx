import { Color, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import { useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect, useMemo } from 'react';
import gsap from 'gsap';
import useGeometry from '../../stores/useGeometry';
import useMaterial from '../../stores/useMaterial';
import useLights from '../../stores/useLights';
import { usePointerHover } from '../../hooks/useCanvasCursor';

export default function Lamp() {
  const { onPointerOver, onPointerOut } = usePointerHover();
  const lamp = useGLTF('./lights/desk_lamp_arm_01_1k.gltf');
  const box = useGeometry((state) => state.box);
  const basic = useMaterial((state) => state.basic);
  const toggle = useLights((state) => state.toggle);
  const spot = useLights((state) => state.spot);

  const lampMaterial = useMemo(() => new MeshBasicMaterial({ color: new Color('#ffffff') }), []);
  const onColor = useMemo(() => new Color('#ffffff'), []);
  const offColor = useMemo(() => new Color('#1b1b1b'), []);

  const { position, rotation } = useControls('Lamp', {
    position: {
      value: { x: -7.5, y: 2.1, z: -2.0 },
    },
    rotation: {
      value: 4.17,
      min: 0,
      max: Math.PI * 2,
    },
  });

  useEffect(() => {
    lamp.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          color: new Color('#1b1b1b'),
          roughness: 0,
          metalness: 0,
        });
        if (child.name === 'Box001_1') child.material = lampMaterial;
      }
    });
  }, []);

  useEffect(() => {
    if (lampMaterial) {
      const target = spot ? onColor : offColor;
      // gsap.killTweensOf(lampMaterial.color);
      gsap.to(lampMaterial.color, {
        r: target.r,
        g: target.g,
        b: target.b,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      });
    }
  }, [spot]);

  const spotLightToggle = (e) => {
    e.stopPropagation();
    toggle('spot');
  };

  return (
    <group>
      <primitive scale={10} rotation-y={rotation} object={lamp.scene} position={[position.x, position.y, position.z]} />
      <mesh
        geometry={box}
        material={basic}
        visible={false}
        scale={[2.1, 2.25, 2]}
        position={[position.x + 1.7, position.y + 6.95, position.z + 1]}
        onClick={spotLightToggle}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      />
      <mesh
        geometry={box}
        material={basic}
        visible={false}
        scale={[0.75, 6, 0.75]}
        position={[position.x - 1.2, position.y + 2, position.z - 0.5]}
        rotation={[Math.PI * -0.1, 0, Math.PI * -0.8]}
        onClick={spotLightToggle}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      />
    </group>
  );
}

useGLTF.preload('./lights/desk_lamp_arm_01_1k.gltf');
