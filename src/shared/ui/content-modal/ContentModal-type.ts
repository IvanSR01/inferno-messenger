import { ReactNode, SetStateAction, Dispatch } from "react"

export type ContentModalProps = {
	children: ReactNode
	showModal: boolean
	setShowModal: Dispatch<SetStateAction<boolean>>
}