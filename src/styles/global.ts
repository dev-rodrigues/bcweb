import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
      
  .react-modal-overlay {
        background: #13121D;
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
      margin-top: 50px;
      width: 100%;
      max-width: 1000px;
      background: #211F2D;
      
      padding: 3rem;
      position: relative;
      border-radius: 0.24rem;
  }

  .react-modal-close {
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
