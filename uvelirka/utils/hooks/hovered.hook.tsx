import { useCallback, useState } from 'react';

export const useHovered = () => {
  const [hovered, setHovered] = useState(false);

  const onMouseEnter = useCallback(() => setHovered(true), []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  return {
    hovered,
    handlers: {
      onMouseEnter,
      onMouseLeave,
    },
  };
};
