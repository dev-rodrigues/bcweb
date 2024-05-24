import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    
  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;

    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-modal-content {
    overflow: hidden;
    width: 100%;
    max-width: 1000px;
    background: #1B1917;

    padding: 3rem;
    position: relative;
    border-radius: 0.24rem;
  }

  .react-modal-close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.7);
    }
  }

`
