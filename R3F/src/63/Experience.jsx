import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { ToneMapping, EffectComposer, Vignette, Glitch, Noise, Bloom, DepthOfField } from '@react-three/postprocessing';
import { GlitchMode, ToneMappingMode, BlendFunction } from 'postprocessing';
import { useControls } from 'leva';
import Drunk from './Drunk';

export default function Experience() {
  const { blendFunction, glitchMode, vignette, glitch, noise, bloom, depthOfField, drunk, frequency, amplitude } =
    useControls({
      blendFunction: {
        value: BlendFunction.DARKEN,
        options: BlendFunction,
      },
      glitchMode: {
        value: GlitchMode.CONSTANT_WILD,
        options: GlitchMode,
      },
      vignette: false,
      glitch: false,
      noise: false,
      bloom: false,
      depthOfField: false,
      drunk: false,
      frequency: {
        value: 2,
        min: 1,
        max: 20,
      },
      amplitude: {
        value: 0.1,
        min: 0,
        max: 1,
      },
    });

  return (
    <>
      <color args={['#ffffff']} attach={'background'} />

      <EffectComposer>
        {vignette && <Vignette offset={0.3} darkness={0.9} blendFunction={blendFunction} />}
        {glitch && <Glitch mode={glitchMode} delay={[0.5, 1]} duration={[0.1, 0.3]} strength={[0.2, 0.4]} />}
        {noise && <Noise premultiply blendFunction={blendFunction} />}
        {bloom && <Bloom luminanceThreshold={0} intensity={0.1} mipmapBlur />}
        {depthOfField && <DepthOfField focusDistance={0.025} focalLength={0.025} bokehScale={6} />}
        {drunk && <Drunk frequency={frequency} amplitude={amplitude} blendFunction={blendFunction} offset={0} />}
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      {bloom ? (
        <mesh castShadow position-x={2} scale={1.5}>
          <boxGeometry />
          <meshBasicMaterial color={[1.5 * 10, 1 * 10, 4 * 10]} toneMapped={false} />
        </mesh>
      ) : (
        <mesh castShadow position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      )}

      <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
