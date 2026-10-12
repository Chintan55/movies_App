import React, { useEffect, useRef } from 'react';

function Paginate({ children, onIntersection }) {
  const observingDiv = useRef(null);

  useEffect(() => {
    const observingElement = observingDiv.current;
    if (!observingElement) return;

    const observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0]?.isIntersecting ?? false;

      onIntersection?.(isIntersecting);
    });

    observer.observe(observingElement);

    return () => {
      observer.disconnect();
    };
  }, [onIntersection]);

  return (
    <div style={{ position: 'relative' }}>
      {children}

      <div
        ref={observingDiv}
        style={{
          position: 'absolute',
          bottom: 0,
          height: `${window.innerHeight * 1.5}px`,
          width: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default Paginate;
