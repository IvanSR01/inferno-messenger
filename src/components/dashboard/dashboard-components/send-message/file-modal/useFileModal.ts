/* eslint-disable react-hooks/exhaustive-deps */
import fileService from '@/services/file-service/file.service'
import uploadsFiles, { useUploadsFiles } from '@/shared/utils/uploadsFiles'
import { useMemo, useState } from 'react'

export default function useFileModal() {
	const [content, setContent] = useState<string>('')
	const { upload, clearCache } = useUploadsFiles(setContent)
	const changeFiles = async (e: any, action: any, id: string) =>
		await upload({
			file: e?.target?.files[0] || e,
			folder: 'files',
			setContent: (p: any) => setContent(p),
			isHaveTag: true,
			action,
			id,
		})

	const clearContent = () => {
		setContent('')
		clearCache()
	}
	return useMemo(() => {
		return {
			changeFiles,
			content,
			clearContent,
		}
	}, [changeFiles, content, clearContent])
}
