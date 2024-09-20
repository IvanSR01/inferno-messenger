import { User } from './user.interface';
import { Post } from './post.interface';

export interface Reaction {
  id: number;
  user: User;
  post: Post;
  reactionType: ReactionType;
}

export interface ReactionType {
  id: number;
  name: string;
  emoji: string;
}
