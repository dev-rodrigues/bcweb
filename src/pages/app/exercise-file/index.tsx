import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { filesize } from 'filesize'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { IoReturnDownBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { FileList } from '@/components/fileList'
import { Upload } from '@/components/upload'
import { api } from '@/lib/axios.ts'

export interface UploadedFile {
  file: File
  id: string
  name: string
  readableSize: string
  preview: string
  progress: number
  uploaded: boolean
  error: boolean
  url: string | null
  type: string
}

interface ResponseAccess {
  accessUrl: string
}

export function ExerciseFile() {
  const navigate = useNavigate()
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleUpload = (files: File[]) => {
    const uploadedFiles: UploadedFile[] = files.map((file) => ({
      file,
      id: uuidv4(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
      type: file.type,
    }))

    setFiles((currentFiles) => [...currentFiles, ...uploadedFiles])

    uploadedFiles.forEach((uploadedFile) => processFile(uploadedFile))
  }

  const updateFile = (id: string, progress: number) => {
    setFiles((currentFiles) =>
      currentFiles.map((file) =>
        file.id === id ? { ...file, progress } : file,
      ),
    )
  }

  const updateFileT = (
    id: string,
    uploaded: boolean,
    error: boolean,
    url: string | null,
  ) => {
    setFiles((currentFiles) =>
      currentFiles.map((file) =>
        file.id === id ? { ...file, uploaded, url, error } : file,
      ),
    )
  }

  const processFile = async (uploadedFile: UploadedFile) => {
    const responseAccess = await api.post<ResponseAccess>('/exercise-media', {
      fileName: uploadedFile.name,
      contentType: uploadedFile.type,
      customerId: 2,
      exerciseId: 2,
    })

    await axios
      .put(responseAccess.data.accessUrl, uploadedFile.file, {
        headers: {
          'Content-Type': uploadedFile.type,
        },
        onUploadProgress: (e) => {
          if (e.total) {
            const progress = Math.round((e.loaded * 100) / e.total)

            updateFile(uploadedFile.id, progress)
          }
        },
      })
      .then(() => {
        updateFileT(uploadedFile.id, true, false, null)
      })
      .catch(() => {
        updateFileT(uploadedFile.id, false, true, null)
      })
  }

  const handleBack = () => {
    navigate('/exercises')
  }

  return (
    <>
      <Helmet title="Exercise File" />
      <Container
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex justify="start" w={'full'} direction={'column'}>
          <Flex>
            <Button
              type="button"
              onClick={handleBack}
              leftIcon={<IoReturnDownBack size={25} />}
            >
              Return
            </Button>
          </Flex>

          <Container mt={2} w={'full'} textAlign={'center'}>
            <Heading>Add medias on your exercise</Heading>
          </Container>
        </Flex>

        <Container
          margin={'30px'}
          width={'100%'}
          bg={'gray.500'}
          borderRadius={'4px'}
          padding={'20px'}
        >
          <Upload onUpload={handleUpload} />
          {!!files.length && <FileList files={files} />}
        </Container>
      </Container>
    </>
  )
}
