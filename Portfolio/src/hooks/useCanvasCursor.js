import { useCallback, useMemo, useState } from 'react';
import { useCursor } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const LEAVE = 'auto';

export function cursorUrl(src, hotspotX = 0, hotspotY = 0, fallback = 'pointer') {
  return `url('${src}') ${hotspotX} ${hotspotY}, ${fallback}`;
}

export function useCanvasCursor(hovered, over = 'grab') {
  const { events, gl } = useThree();
  const domElement = useMemo(() => events.connected || gl.domElement, [events.connected, gl.domElement]);
  useCursor(hovered, over, LEAVE, domElement);
}

export function usePointerHover(over = 'grab') {
  const [hovered, setHovered] = useState(false);
  useCanvasCursor(hovered, over);

  const onPointerOver = useCallback((e) => {
    e.stopPropagation();
    setHovered(true);
  }, []);

  const onPointerOut = useCallback((e) => {
    e.stopPropagation();
    setHovered(false);
  }, []);

  return { hovered, onPointerOver, onPointerOut };
}
