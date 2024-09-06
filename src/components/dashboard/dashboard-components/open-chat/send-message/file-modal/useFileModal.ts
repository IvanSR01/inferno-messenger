/* eslint-disable react-hooks/exhaustive-deps */
import fileService from '@/services/file-service/file.service'
import uploadsFiles from '@/shared/utils/uploadsFiles'
import { useMemo, useState } from 'react'

export default function useFileModal() {
	const [content, setContent] = useState<string>('')

	const changeFiles = async(e: any) => await uploadsFiles(e, setContent) 

	const clearContent = () => {
		setContent('')
	}
	return useMemo(() => {
		return {
			changeFiles,
			content,
			clearContent,
		}
	}, [changeFiles, content, clearContent])
}

