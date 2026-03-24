import Table from '../Table/Table';
import Cup from '../Cup/Cup';
import Laptop from '../Laptop/Laptop';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useScenePosition from '../stores/useScenePosition';
import Environment from '../Environment/Environment';
import Lamp from '../Lamp/Lamp';
import Lights from '../Lights/Lights';

export default function WorkSpace() {
  const sceneRef = useRef();

  const moveScene = (position) => {
    gsap.to(sceneRef.current.position, {
      duration: 2,
      ...position,
    });
  };

  useEffect(() => {
    const unsubscribeMoveScene = useScenePosition.subscribe(
      (state) => state.position,
      (value) => value && moveScene(value),
    );

    return () => {
      unsubscribeMoveScene();
    };
  }, []);

  return (
    <group ref={sceneRef} scale={0.5}>
      <Lights />
      <Environment />
      <Table />
      <Laptop />
      <Cup />
      <Lamp />
    </group>
  );
}
