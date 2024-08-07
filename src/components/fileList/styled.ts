import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    div {
      display: flex;
    }

    a {
      margin-right: 5px;
    }

    svg {
      margin-right: 5px;
    }

    & + li {
      margin-top: 15px;
    }
  }
`

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;

      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`

interface PreviewProps {
  src: string
}

export const Preview = styled.div<PreviewProps>`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`
export const VideoPreview = styled.video`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`
