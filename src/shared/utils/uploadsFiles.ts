/* eslint-disable react-hooks/exhaustive-deps */
import fileService from '@/services/file-service/file.service'
import { addFullUrl } from './addFullUrl'
import { useEffect, useMemo, useState } from 'react'

interface IUploadFile {
	file: Blob
	folder: string
	setContent: (p: any) => void
	isHaveTag?: boolean
}

interface IUploadManyFile extends IUploadFile {
	action: 'add' | 'edit'
	id: string
}

export const useUploadsFiles = (setContent: (p: any) => void) => {
	const [cacheFile, setCacheFile] = useState<string[] | null>(null)
	const upload = async (p: IUploadManyFile) => {
		if (p.action === 'edit') {
			return setCacheFile(cacheFile?.filter((f: string) => f !== p.id) ?? [])
		}
		await uploadsFiles({ ...p, setContent: changeHandler })
	}
	const changeHandler = (data: string) => {
		setCacheFile([...(cacheFile ?? []), data])
	}

	const clearCache = () => {
		setCacheFile(null)
	}

	useEffect(() => {
		if (cacheFile !== null) {
			let content = ''
			cacheFile.forEach((p: string) => {
				content = `${content}\n${p}`
			})
			setContent(content)
		}
	}, [cacheFile])

	return useMemo(() => ({ upload, cacheFile, clearCache }), [upload, cacheFile])
}

export default async function uploadsFiles({
	file,
	folder,
	setContent,
	isHaveTag = false,
}: IUploadFile) {
	const data = await fileService.uploadFile(
		file,
		`${folder}/${file.type.split('/')[0]}`
	)
	const tag = tags[file.type]
		? tags[file.type](data.path)
		: `<embed  src="${addFullUrl(`/${data.path.replaceAll('\\', '/')}`)}" width="600" height="400" />`
	setContent(isHaveTag ? tag : data.path.replaceAll('\\', '/'))
}
const tags: any = {
	'image/png': (p: any) => `<img src="/${p}" />`,
	'image/jpeg': (p: any) => `<img src="/${p}" />`,
	'image/gif': (p: any) => `<img src="/${p}" />`,
	'image/webp': (p: any) => `<img src="/${p}" />`,
	'audio/mpeg': (p: any) => `<audio src="/${p}" controls></audio>`,
	'audio/ogg': (p: any) => `<audio src="/${p}" controls></audio>`,
	'audio/wav': (p: any) => `<audio src="/${p}" controls></audio>`,
	'audio/mp3': (p: any) => `<audio src="/${p}" controls></audio>`,
	'video/mp4': (p: any) => `<video src="/${p}" controls></video>`,
	'video/ogg': (p: any) => `<video src="/${p}" controls></video>`,
	'video/webm': (p: any) => `<video src="/${p}" controls></video>`,
}
