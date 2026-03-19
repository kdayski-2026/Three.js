import { useKeyboardControls } from '@react-three/drei';
import useGame from './stores/useGame.js';
import { useEffect, useMemo, useRef } from 'react';
import { addEffect } from '@react-three/fiber';

export default function Interface() {
  const time = useRef();
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const pressedRef = useRef(new Set());

  const dispatchKey = (code, pressed) => {
    const type = pressed ? 'keydown' : 'keyup';

    const wasPressed = pressedRef.current.has(code);
    if (pressed && wasPressed) return;
    if (!pressed && !wasPressed) return;

    if (pressed) pressedRef.current.add(code);
    else pressedRef.current.delete(code);

    window.dispatchEvent(
      new KeyboardEvent(type, {
        code,
        bubbles: true,
        cancelable: true,
      }),
    );
  };

  const bindVirtualKey = useMemo(() => {
    return (code) => ({
      role: 'button',
      tabIndex: 0,
      onPointerDown: (e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture?.(e.pointerId);
        dispatchKey(code, true);
      },
      onPointerUp: (e) => {
        e.preventDefault();
        dispatchKey(code, false);
      },
      onPointerCancel: (e) => {
        e.preventDefault();
        dispatchKey(code, false);
      },
      onPointerLeave: (e) => {
        e.preventDefault();
        dispatchKey(code, false);
      },
    });
  }, []);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;

      if (state.phase === 'playing') elapsedTime = Date.now() - state.startTime;
      else if (state.phase === 'ended') elapsedTime = state.endTime - state.startTime;
      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent = elapsedTime;
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      <div className="time" ref={time}>
        0.00
      </div>

      {phase === 'ended' && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? 'active' : ''}`} {...bindVirtualKey('KeyW')}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? 'active' : ''}`} {...bindVirtualKey('KeyA')}></div>
          <div className={`key ${backward ? 'active' : ''}`} {...bindVirtualKey('KeyS')}></div>
          <div className={`key ${rightward ? 'active' : ''}`} {...bindVirtualKey('KeyD')}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? 'active' : ''}`} {...bindVirtualKey('Space')}></div>
        </div>
      </div>
    </div>
  );
}
