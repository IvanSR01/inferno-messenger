import { Message } from "./message.interface";
import { Pinned } from "./pinned.interface";
import { User } from "./user.interface";

export interface Chat {
    id: number;
    users: User[];
    messages: Message[];
    name: string;
    avatar?: string;
    isPersonal: boolean;
    createdAt: Date;
    typing: User[];
    pinnedByUsers: Pinned[];

}

export interface CreateChat {
	ids: number[]
	isPersonal: boolean
	name: string
	img: string
}