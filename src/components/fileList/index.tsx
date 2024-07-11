import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import { Container, FileInfo, Preview } from '@/components/fileList/styled.ts'
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
            <Preview src={file.preview} />
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize} <button>Remove</button>
              </span>
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

            {file.url && (
              <a
                href="https://via.placeholder.com/100"
                target={'_blank'}
                rel="noopener noreferrer"
              >
                <MdLink style={{ marginRight: 8 }} size={24} color={'#222'} />
              </a>
            )}

            {file.uploaded && <MdCheckCircle size={24} color={'#78e5d5'} />}
            {file.error && <MdError size={24} color={'#e57878'} />}
          </div>
        </li>
      ))}
    </Container>
  )
}
