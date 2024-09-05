import { FC } from "react";
import styles from "./SendMenu.module.scss";
import { SendMenuProps } from "./SendMenu-type";
import { AnimatePresence, motion } from "framer-motion";
import { variants } from "@/shared/motion/variants";
import clsx from "clsx";
import { Icons } from "../icons";
const SendMenu: FC<SendMenuProps> = ({
  isModalOpen,
  messageType,
  handleMessageTypeChange,
}) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          variants={variants}
          initial="init"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className={styles.modalSwitchType}
        >
          {Object.keys(Icons).map((key, i) => (
            <div
              key={i}
              className={clsx(styles.switchType, {
                [styles.active]: messageType === key,
              })}
              onClick={() => handleMessageTypeChange(key as keyof typeof Icons)}
            >
              <p>{key}</p>
              {Icons[key as keyof typeof Icons]}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default SendMenu;
