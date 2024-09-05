import { Chat } from "./chat.intreface";
import { User } from "./user.interface";

export interface Message {
	id: number;
	content: string;
	chat: Chat;
	user: User;
	isRead: boolean;
	sendTime: string;
}
