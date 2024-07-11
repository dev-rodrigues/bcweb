import styled, { css } from 'styled-components'

interface DropContainerProps {
  isDragActive: boolean
  isDragReject: boolean
}

const dragActive = css`
  border-color: #78e5d5;
`

const dragReject = css`
  border-color: #e57878;
`

export const DropContainer = styled.div.attrs<DropContainerProps>({
  className: 'dropzone',
})`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${({ isDragActive }) => isDragActive && dragActive}
  ${({ isDragReject }) => isDragReject && dragReject}
`

interface UploadMessageProps {
  type?: 'success' | 'error'
}

const messageColors = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5',
}

export const UploadMessage = styled.p<UploadMessageProps>`
  display: flex;
  color: ${({ type }) => messageColors[type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`
