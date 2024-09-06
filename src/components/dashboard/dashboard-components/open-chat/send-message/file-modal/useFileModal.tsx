/* eslint-disable react-hooks/exhaustive-deps */
import fileService from '@/services/file-service/file.service'
import { useMemo, useState } from 'react'

export default function useFileModal() {
	const [content, setContent] = useState<string>('')
	const uploadsFiles = async (e: any) => {
		const file = e.target.files[0]
		const data = await fileService.uploadFile(
			file,
			`message/${file.type.split('/')[0]}`
		)

		setContent(tags[data.mimetype](data.filename))
	}
	const clearContent = () => {
		setContent('')
	}
	return useMemo(() => {
		return {
			uploadsFiles,
			content,
			clearContent,
		}
	}, [uploadsFiles, content, clearContent])
}

const tags: any = {
	'image/png': (p: any) => `<img src="/uploads/message/image/${p}" />`,
	'image/jpeg': (p: any) => `<img src="/uploads/message/image/${p}" />`,
	'image/gif': (p: any) => `<img src="/uploads/message/image/${p}" />`,
	'image/webp': (p: any) => `<img src="/uploads/message/image/${p}" />`,
	'audio/mpeg': (p: any) =>
		`<audio src="/uploads/message/audio/${p}" controls></audio>`,
	'audio/ogg': (p: any) =>
		`<audio src="/uploads/message/audio/${p}" controls></audio>`,
	'audio/wav': (p: any) =>
		`<audio src="/uploads/message/audio/${p}" controls></audio>`,
	'audio/mp3': (p: any) =>
		`<audio src="/uploads/message/audio/${p}" controls></audio>`,
	'video/mp4': (p: any) =>
		`<video src="/uploads/message/video/${p}" controls></video>`,
	'video/ogg': (p: any) =>
		`<video src="/uploads/message/video/${p}" controls></video>`,
	'video/webm': (p: any) =>
		`<video src="/uploads/message/video/${p}" controls></video>`,
}
