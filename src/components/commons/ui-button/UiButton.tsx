import styles from './UiButton.module.css';

export default function UiButton({children, className, ...rest}: {children: React.ReactNode} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`${styles.uiButton} ${className || ''}`} {...rest}>{children}</button>;
}