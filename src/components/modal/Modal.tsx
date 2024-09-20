import clsx from 'clsx'
import { FC, useEffect, useRef } from 'react'
import { ModalProps } from './Modal-type'
import styles from './Modal.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { variants } from '@/shared/motion/variants'
const Modal: FC<ModalProps> = ({
	children,
	showModal,
	setShowModal,
	isDisableClickOutside,
}) => {
	useEffect(() => {
		const handlerClick = (e: any) => {
			if (isDisableClickOutside) return
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
		<AnimatePresence>
			<div className={clsx(styles.modal, { [styles.showModal]: showModal })}>
				{showModal && (
					<motion.div
						variants={variants}
						initial="init"
						animate="animate"
						exit="exit"
						className={styles['modal-content']}
						ref={modalRef}
					>
						{children}
					</motion.div>
				)}
			</div>
		</AnimatePresence>
	)
}

export default Modal
