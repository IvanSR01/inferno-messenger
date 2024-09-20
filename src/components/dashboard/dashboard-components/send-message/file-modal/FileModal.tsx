import { FC, Fragment, useRef, useState } from 'react'
import styles from './FileModal.module.scss'
import Modal from '@/components/modal/Modal'
import parse from 'html-react-parser'
import Button from '@/shared/ui/button/Button'
import { addFullUrl } from '@/shared/utils/addFullUrl'
import Input from '@/shared/ui/input/Input'
import { FaTrash } from 'react-icons/fa'
import ContentModal from '@/shared/ui/content-modal/ContentModal'
interface Props {
	content: string
	clearContent: () => void
	handleSend: (messageContent: string, mediaUrl?: string) => void
	upload: any
}

const FileModal: FC<Props> = ({
	content,
	clearContent,
	handleSend,
	upload,
}) => {
	const send = () => {
		handleSend(`${content} <p class='text-message'>${value}</p>`)
		setValue('')
		clearContent()
	}
	const inputRef = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState('')
	return (
		<Modal setShowModal={clearContent} showModal={!!content}>
			<div className={styles.wrapper}>
				<div
					className={`${styles.content} ${
						content.split('\n').filter(Boolean).length === 1
							? styles.singleFile
							: styles.multipleFiles
					}`}
				>
					{content.split('\n').map((p, i) => (
						<Fragment key={i}>
							{p && (
								<div>
									<span>{parse(addFullUrl(p))}</span>
									<Button onClick={() => upload(p, 'edit', p)}>
										<FaTrash />
									</Button>
								</div>
							)}
						</Fragment>
					))}
				</div>

				<input
					ref={inputRef}
					hidden
					type="file"
					onChange={(e) => upload(e, 'add', '')}
					accept="image/png, image/gif, image/jpeg, video/mp4, audio/*"
				/>
				<Button onClick={() => inputRef.current?.click()}>+</Button>
				<Input
					value={value}
					onChange={(e: any) => setValue(e.target.value)}
					placeholder="Enter text (optional)"
				/>
				<div className={styles.bottom}>
					<Button onClick={() => clearContent()} color="red">
						CLEAR
					</Button>
					<Button color="green" onClick={() => send()}>
						SEND
					</Button>
				</div>
			</div>
		</Modal>
	)
}
export default FileModal
