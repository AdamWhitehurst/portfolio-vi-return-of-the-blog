import React from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
import('../wasm/roguie_bg.wasm').then((wasm) => wasm.__wbindgen_start());

export const WASMCanvas = styled.canvas.attrs(() => ({
  // Necessary for bracket-lib wasm-bindgen impl
  id: 'canvas',
}))`
    width: 640px;
    height: 400px;
    display: none;
`;

export function RoguieCanvas() {
  // Okay we're doing a little hack here because bracket-lib bindgen does not
  // support reloading canvas elements. Therefore, we always have a canvas
  // element but we hide it until this Component is loaded.

  // Make a ref so that we can attach the canvas element to this Component in
  // the DOM
  const ref = React.useRef();

  React.useEffect(() => {
    // On load, this Component finds the canvas element, appends it to itself
    const canvasElem = document.getElementById('canvas');
    canvasElem.style.display = 'unset';
    ref.current.appendChild(canvasElem);

    // On unload, this Component reattaches the canvas element to the document
    // and does everything it can to make the element not exist without
    // unloading it.
    return () => {
      const canvasElem = document.getElementById('canvas');
      canvasElem.style.display = 'none';
      document.querySelector('body').appendChild(canvasElem);
    };
  });
  return (
    <div ref={ref} />
  );
}
