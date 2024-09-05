import { Icons } from "../icons";

export type SendMenuProps = {
	isModalOpen: boolean;
	open: () => void;
	close: () => void;
	messageType: keyof typeof Icons;
	handleMessageTypeChange: (type: keyof typeof Icons) => void;
}