import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError } from 'react-icons/md'

import {
  Container,
  FileInfo,
  Preview,
  VideoPreview,
} from '@/components/fileList/styled.ts'
import { UploadedFile } from '@/pages/app/exercise-file'

interface Props {
  files: UploadedFile[]
}

export function FileList({ files }: Props) {
  return (
    <Container>
      {files.map((file, index) => (
        <li key={index}>
          <FileInfo>
            {file.type.includes('image') && <Preview src={file.preview} />}

            {file.type.includes('video') && (
              <VideoPreview>
                <source src={file.preview} type={file.type} />
              </VideoPreview>
            )}

            <div>
              <strong>{file.name}</strong>
              <span>{file.readableSize}</span>
            </div>
          </FileInfo>
          <div>
            {!file.uploaded && !file.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159c1' },
                }}
                strokeWidth={10}
                value={file.progress}
              />
            )}

            {file.uploaded && <MdCheckCircle size={24} color={'#78e5d5'} />}
            {file.error && <MdError size={24} color={'#e57878'} />}
          </div>
        </li>
      ))}
    </Container>
  )
}
