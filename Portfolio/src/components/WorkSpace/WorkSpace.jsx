import Table from '../../components/Table/Table';
import Cup from '../../components/Cup/Cup';
import Laptop from '../../components/Laptop/Laptop';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useScenePosition from '../../stores/useScenePosition';
import Environment from '../../components/Environment/Environment';
import Lamp from '../../components/Lamp/Lamp';
import Lights from '../../components/Lights/Lights';
import Board from '../../components/Board/Board';

export default function WorkSpace() {
  const sceneRef = useRef();

  const moveScene = (position) => {
    // gsap.killTweensOf(sceneRef.current.position);
    gsap.to(sceneRef.current.position, {
      duration: 2,
      ...position,
    });
  };

  const rotateScene = (position) => {
    // gsap.killTweensOf(sceneRef.current.position);
    gsap.to(sceneRef.current.rotation, {
      duration: 2,
      ...position,
    });
  };

  useEffect(() => {
    const unsubscribeMoveScene = useScenePosition.subscribe(
      (state) => state.position,
      (value) => value && moveScene(value)
    );
    const unsubscribeRotateScene = useScenePosition.subscribe(
      (state) => state.rotation,
      (value) => value && rotateScene(value)
    );

    return () => {
      unsubscribeMoveScene();
      unsubscribeRotateScene();
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
      <Board />
    </group>
  );
}
