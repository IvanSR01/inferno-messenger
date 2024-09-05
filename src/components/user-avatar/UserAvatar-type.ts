import { sizes } from "./UserAvatar";

export type UserAvartarProps = {
	src?: string | undefined;
	alt?: string;
	size?: keyof typeof sizes;
	altStyle?: boolean;
}