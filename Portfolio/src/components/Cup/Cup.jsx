import { useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import Tea from './Tea';
import { useEffect } from 'react';
import { cursorUrl, usePointerHover } from '../../hooks/useCanvasCursor';
import useGlitch from '../../stores/useGlitch';

export default function Cup() {
  const { onPointerOver, onPointerOut } = usePointerHover(cursorUrl('/cursors/glitch-hint.svg', 16, 10));

  const toggleGlitch = useGlitch((state) => state.toggleGlitch);
  const model = useGLTF('/tea/uploads_files_6535368_Seramik_ini_kupa.glb');

  const { position, scale, rotation } = useControls('Cup', {
    position: {
      value: { x: 3.38, z: -0.96 },
      step: 0.01,
      joystick: 'invertY',
    },
    scale: {
      value: 0.15,
      min: 0,
      max: 1,
    },
    rotation: {
      value: 5.48,
      min: 0,
      max: Math.PI * 2,
    },
  });

  useEffect(() => {
    if (model) {
      model.scene.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          child.castShadow = true;
        }
      });
    }
  }, [model]);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleGlitch();
  };

  return (
    <group
      scale={2.5}
      position={[position.x, 2.1, position.z]}
      onClick={handleClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <primitive object={model.scene} scale={scale} rotation-y={rotation} />
      <Tea />
    </group>
  );
}

useGLTF.preload('/tea/uploads_files_6535368_Seramik_ini_kupa.glb');
