import { Channel } from "diagnostics_channel";
import { Reaction } from "./reaction.intreface";
import { User } from "./user.interface";
import { Comment } from "./comment.interface";


export interface Post {
  id: number;
  content: string;
  linkId: number;
  view: number;
  reactions: Reaction[];
  channel: Channel;
  author: User;
  comments: Comment[];
	sendTime: string;
}
