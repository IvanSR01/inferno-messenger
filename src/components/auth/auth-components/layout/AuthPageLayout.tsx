import { FC, PropsWithChildren } from "react";
import styles from "./AuthPageLayout.module.scss";
const AuthPageLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};
export default AuthPageLayout;
