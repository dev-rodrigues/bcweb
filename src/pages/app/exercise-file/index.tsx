import { Button, Container, Flex, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { filesize } from 'filesize'
import { uniqueId } from 'lodash'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { IoReturnDownBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

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
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }))

    setFiles((currentFiles) => [...currentFiles, ...uploadedFiles])

    files.forEach((it) => processFile(it))
  }

  const processFile = async (it: File) => {
    const response = await axios.put('url', it, {
      headers: {
        'Content-Type': it.type,
        Origin: 'https://bcweb.vercel.app',
      },
    })

    console.log(response)
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
