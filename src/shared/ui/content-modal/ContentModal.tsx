import { FC } from 'react'
import styles from './ContentModal.module.scss'
import { ContentModalProps } from './ContentModal-type'
import Modal from '@/components/modal/Modal'

const ContentModal: FC<ContentModalProps> = ({
	children,
	showModal,
	setShowModal,
}) => {
	return (
		<Modal setShowModal={setShowModal} showModal={showModal}>
			<div className={styles['content-modal']}>{children}</div>
		</Modal>
	)
}
export default ContentModal
