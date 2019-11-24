import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        color: inherit;
    }

    body {
        background-color: #0e111b;
        color: #fff;
    }

    canvas {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    button {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
