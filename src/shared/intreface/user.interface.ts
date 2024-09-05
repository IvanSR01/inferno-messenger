import { Chat } from "./chat.intreface";
import { Message } from "./message.interface";
import { Pinned } from "./pinned.interface";

export interface User {
  id: number;
  email: string;
  isVerified: boolean;
  password: string;
  oauthId?: string;
  username: string;
  picture: string;
  fullName: string;
  secreteKeyJwtHash: string;
  chats: Chat[];
  messages: Message[];
  contact: User[];
  pinnedChats: Pinned[];
	status: {
		lastSeen: Date
		isOnline: boolean
	}
}
