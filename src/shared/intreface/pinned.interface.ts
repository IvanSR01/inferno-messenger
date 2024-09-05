import { Chat } from "./chat.intreface";
import { User } from "./user.interface";

export interface Pinned {
	id: number;
	user: User;
	chat: Chat;
	pinnedAt: Date;
}
