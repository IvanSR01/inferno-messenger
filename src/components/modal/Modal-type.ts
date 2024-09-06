import { Dispatch, ReactNode, SetStateAction } from 'react'

export type ModalProps = {
	children?: ReactNode
	showModal: boolean
	setShowModal: Dispatch<SetStateAction<boolean>>
}
