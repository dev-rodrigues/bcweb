import {
  Button,
  Container,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { filesize } from 'filesize'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { IoReturnDownBack } from 'react-icons/io5'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { postExerciseMedia } from '@/api/exercise-media.ts'
import { truncateText } from '@/common/str-common.tsx'
import { FileList } from '@/components/fileList'
import { LoadingSpinner } from '@/components/ui/spinner.tsx'
import { TableHeader } from '@/components/ui/table.tsx'
import { Upload } from '@/components/upload'
import { useAuth } from '@/context/AuthContext.tsx'
import { useExerciseMedia } from '@/services/exercises-hook.ts'
import { ContentItemSchemaType } from '@/types/common-exercise.ts'

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

export function ExerciseFile() {
  const navigate = useNavigate()
  const params = useParams()
  const { user } = useAuth()
  const location = useLocation()
  const state = location.state as { data?: ContentItemSchemaType }

  const [files, setFiles] = useState<UploadedFile[]>([])
  const {
    data: uploadedFiles,
    isFetching,
    refetch,
  } = useExerciseMedia(user?.id ?? 0, Number(params.exerciseId))

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

  const processFile = async (uploadedFile: UploadedFile) => {
    const customerId = user?.id ?? 0
    const exerciseId = Number(params.exerciseId)

    try {
      const responseAccess = await postExerciseMedia(
        uploadedFile,
        customerId,
        exerciseId,
      )

      const newFileName = responseAccess.fileKey

      const newFile = new File([uploadedFile.file], newFileName, {
        type: uploadedFile.type,
      })

      await axios
        .put(responseAccess.accessUrl, newFile, {
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
          refetch()
        })
        .catch(() => {
          updateFileT(uploadedFile.id, false, true, null)
        })

      updateFileT(uploadedFile.id, true, false, null)
    } catch (error) {
      toast.error(`Error to upload file ${uploadedFile.name}`)
      updateFileT(uploadedFile.id, false, true, null)
    }
  }

  const handleBack = () => {
    navigate('/exercises')
  }

  return (
    <>
      <Helmet title="Exercise File" />
      <Flex direction={'column'} mr={10}>
        <Flex direction={'column'}>
          <Flex>
            <Button
              type="button"
              onClick={handleBack}
              leftIcon={<IoReturnDownBack size={25} />}
            >
              Return
            </Button>
          </Flex>

          <Heading mt={10} textAlign={'center'}>
            {`Add medias on your exercise to ${state?.data?.name}`}
          </Heading>
        </Flex>
        <Flex justify={'center'}>
          <Container
            margin={'30px'}
            width={'100%'}
            borderRadius={'4px'}
            padding={'20px'}
          >
            <Upload onUpload={handleUpload} />
            {!!files.length && <FileList files={files} />}
          </Container>

          <Container
            minH={'100px'}
            margin={'30px'}
            width={'100%'}
            borderRadius={'4px'}
            padding={'20px'}
          >
            <TableContainer
              border={'inset'}
              borderColor={'gray.300'}
              borderWidth={0.5}
              borderRadius={'5px'}
              px={10}
            >
              <Table>
                <TableHeader>
                  <Heading>Medias</Heading>
                </TableHeader>
                <TableCaption>Medias registered in the system</TableCaption>
                <Thead>
                  <Tr>
                    <Th style={{ textAlign: 'center' }}>Id</Th>
                    <Th style={{ textAlign: 'center' }}>Name</Th>
                    <Th style={{ textAlign: 'center' }}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isFetching && (
                    <Tr>
                      <Td colSpan={3}>
                        <VStack alignItems={'center'} alignContent={'center'}>
                          <LoadingSpinner />
                        </VStack>
                      </Td>
                    </Tr>
                  )}
                  {!uploadedFiles?.length && !isFetching && (
                    <Tr>
                      <Td colSpan={3}>
                        <VStack alignItems={'center'} alignContent={'center'}>
                          <Heading size="md">No files uploaded</Heading>
                        </VStack>
                      </Td>
                    </Tr>
                  )}
                  {uploadedFiles?.map((it) => (
                    <Tr key={it.id}>
                      <Td style={{ textAlign: 'center' }}>{it.id}</Td>
                      <Td style={{ textAlign: 'center' }}>
                        {truncateText(it.fileName, 22)}
                      </Td>
                      <Td style={{ textAlign: 'center' }}>
                        <Button>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Container>
        </Flex>
      </Flex>
    </>
  )
}
