import { Color } from 'three';
import { useControls } from 'leva';
import uniforms from '../shaders/tea/uniforms.glsl?raw';
import fragmentShader from '../shaders/tea/fragment.glsl?raw';
import varyingInit from '../shaders/tea/vertex_varying_init.glsl?raw';
import varyingExport from '../shaders/tea/vertex_varying_export.glsl?raw';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Tea() {
  const teaRef = useRef();
  const { roughness, metalness, opacity, uPointsMod, uWavesMod } = useControls('Tea', {
    roughness: {
      value: 0,
      min: 0,
      max: 1,
    },
    metalness: {
      value: 1,
      min: 0,
      max: 1,
    },
    opacity: {
      value: 0.8,
      min: 0,
      max: 1,
    },
    uPointsMod: {
      value: 1,
      min: 0,
      max: 10,
    },
    uWavesMod: {
      value: 1,
      min: 0,
      max: 10,
    },
  });

  useFrame((_, delta) => {
    if (teaRef.current.shader) {
      teaRef.current.shader.uniforms.uTime.value += delta;
      teaRef.current.shader.uniforms.uPointsMod.value = uPointsMod;
      teaRef.current.shader.uniforms.uWavesMod.value = uWavesMod;
    }
  });

  return (
    <mesh rotation-x={Math.PI * -0.5} position={[0.15, 0.17, 0.06]}>
      <circleGeometry args={[0.14, 16]} />
      <meshStandardMaterial
        ref={teaRef}
        color="#4C1208"
        transparent={true}
        roughness={roughness}
        metalness={metalness}
        opacity={opacity}
        onBeforeCompile={(shader) => {
          shader.uniforms.uTime = { value: 0 };
          shader.uniforms.uColorStart = { value: new Color('#4C1208') };
          shader.uniforms.uColorEnd = { value: new Color('#665552') };
          shader.uniforms.uPointsMod = { value: uPointsMod };
          shader.uniforms.uWavesMod = { value: uWavesMod };
          shader.vertexShader = shader.vertexShader.replace(
            '#include <clipping_planes_pars_vertex>',
            varyingInit,
          );
          shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', varyingExport);
          shader.fragmentShader = shader.fragmentShader.replace('uniform float opacity;', uniforms);
          shader.fragmentShader = shader.fragmentShader.replace(
            '#include <color_fragment>',
            fragmentShader,
          );
          teaRef.current.shader = shader;
        }}
      />
    </mesh>
  );
}
