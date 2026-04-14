import WorkSpace from './components/WorkSpace/WorkSpace';
import { Perf } from 'r3f-perf';
import Controls from './Controls';
import { EffectComposer, Glitch, ToneMapping } from '@react-three/postprocessing';
import { GlitchMode, ToneMappingMode } from 'postprocessing';
import useGlitch from './stores/useGlitch';

export default function Experience() {
  const glitch = useGlitch((state) => state.glitch);

  return (
    <>
      {import.meta.env.DEV && <Perf position="top-left" />}

      {glitch && (
        <EffectComposer>
          <Glitch mode={GlitchMode.CONSTANT_WILD} delay={[0.5, 1]} duration={[0.1, 0.3]} strength={[0.2, 0.4]} />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      )}

      <Controls>
        <WorkSpace />

        {/* lookAt */}
        {/* <mesh rotation-x={Math.PI * -0.5} scale={0.1}>
          <planeGeometry />
          <meshBasicMaterial />
        </mesh> */}
      </Controls>
    </>
  );
}
