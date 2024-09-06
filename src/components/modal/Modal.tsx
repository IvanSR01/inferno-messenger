import clsx from 'clsx'
import { FC, useEffect, useRef } from 'react'
import { ModalProps } from './Modal-type'
import styles from './Modal.module.scss'
const Modal: FC<ModalProps> = ({ children, showModal, setShowModal }) => {
	useEffect(() => {
		const handlerClick = (e: any) => {
			if (showModal) {
				if (!modalRef.current?.contains(e.target)) {
					setShowModal(false)
				}
			}
			return
		}

		document.addEventListener('click', handlerClick)

		return () => document.removeEventListener('click', handlerClick)
	})
	const modalRef = useRef<HTMLDivElement>(null)
	return (
		<div className={clsx(styles.modal, { [styles.showModal]: showModal })}>
			{showModal && (
				<div className={styles.modal__content} ref={modalRef}>
					{children}
				</div>
			)}
		</div>
	)
}

export default Modal
