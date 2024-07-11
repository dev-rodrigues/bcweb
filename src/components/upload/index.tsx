import Dropzone from 'react-dropzone'

import { DropContainer, UploadMessage } from '@/components/upload/styled.ts'

interface Props {
  onUpload: (files: File[]) => void
}

export function Upload({ onUpload }: Props) {
  function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) {
      return <UploadMessage>Drag files here ...</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type={'error'}>Unsupported file</UploadMessage>
    }

    return <UploadMessage type={'success'}>Drop files here</UploadMessage>
  }

  return (
    <Dropzone
      accept={{
        'video/*': [],
      }}
      onDropAccepted={onUpload}
      maxFiles={3}
      maxSize={52428800}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  )
}
