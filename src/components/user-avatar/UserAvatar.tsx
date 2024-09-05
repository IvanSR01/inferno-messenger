/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import styles from "./UserAvatar.module.scss";
import { UserAvartarProps } from "./UserAvatar-type";
import clsx from "clsx";
import { addFullUrl } from "@/shared/utils/addFullUrl";

export const sizes = {
	ultraSmall: styles.ultraSmall,
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

const UserAvatar: FC<UserAvartarProps> = ({ size, src, alt, altStyle }) => {
  return (
    <div
      className={clsx(styles.containerAvatar, sizes[size ? size : "medium"], {
				[styles.altStyle]: altStyle,
			})}
    >
      {src ? (
        <>
          {src.includes(".mp4") ? (
            <video src={addFullUrl(src)} autoPlay loop muted />
          ) : (
            <img src={addFullUrl(src)} alt={alt} />
          )}
        </>
      ) : (
        <div className={styles.alt}>{alt?.split(" ")[0].slice(0, 1)}</div>
      )}
    </div>
  );
};
export default UserAvatar;
