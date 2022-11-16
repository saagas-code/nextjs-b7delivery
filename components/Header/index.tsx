import styles from "./styles.module.css";
import BackIcon from "./backIcon.svg";
import Link from "next/link";

type Props = {
  backHref: string;
  color: string;
  title?: string;
  subTitle?: string;
  invert?: boolean;
};

export const Header = ({ backHref, color, title, subTitle, invert }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Link
          href={backHref}
          className={invert ? styles.buttonTransparent : ""}
        >
          <BackIcon color={invert ? "#FFF" : color} />
        </Link>
      </div>
      <div className={styles.centerSide}>
        {title && (
          <div
            className={styles.title}
            style={{ color: invert ? "#FFF" : "#1b1b1b" }}
          >
            {title}
          </div>
        )}
        {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
      </div>
      <div className={styles.rightSide}></div>
    </div>
  );
};
