import { FC } from 'react'
import styles from './FileModal.module.scss'
import Modal from '@/components/modal/Modal'
import parse from 'html-react-parser'
import Button from '@/shared/ui/button/Button'
import { useSendMessage } from '@/hooks/useMessages'
import { addFullUrl } from '@/shared/utils/addFullUrl'
interface Props {
	content: string
	clearContent: () => void
	userId: number
	chatId: number
}

const FileModal: FC<Props> = ({ content, clearContent, userId, chatId }) => {
	const sendMessage = useSendMessage()
	const send = () => {
		sendMessage({
			content: content,
			userId: userId,
			chatId: chatId,
		})
		clearContent()
	}
	return (
		<Modal setShowModal={clearContent} showModal={!!content}>
			<div className={styles.wrapper}>
				<div className={styles.content}>{parse(addFullUrl(content))}</div>
				<div className={styles.bottom}>
					<Button onClick={() => clearContent()} altStyle={true}>
						CLEAR
					</Button>
					<Button onClick={() => send()}>SEND</Button>
				</div>
			</div>
		</Modal>
	)
}
export default FileModal
