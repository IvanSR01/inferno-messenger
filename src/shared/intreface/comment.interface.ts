import { User } from './user.interface';
import { Post } from './post.interface';

export interface Comment {
  id: number;
  content: string;
  date: Date;
  user: User;
  post: Post;
}
