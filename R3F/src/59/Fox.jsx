import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { useControls } from 'leva';

export default function Fox() {
  const model = useGLTF('./Fox/glTF/Fox.gltf');
  const animations = useAnimations(model.animations, model.scene);

  const { animationName } = useControls({
    animationName: { options: animations.names },
  });

  useEffect(() => {
    animations.actions[animationName].reset().fadeIn(0.5).play();
    return () => {
      animations.actions[animationName].fadeOut(0.5);
    };
  }, [animationName]);

  return <primitive object={model.scene} scale={0.02} position={[-2.5, 0, 2.5]} rotation-y={0.3} />;
}

useGLTF.preload('./Fox/glTF/Fox.gltf');
