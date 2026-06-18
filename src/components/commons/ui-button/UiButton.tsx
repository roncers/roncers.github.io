import styles from './UiButton.module.css';

export default function UiButton({ children, className, onClick, ...rest }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className={`${styles.uiButton} ${className || ''}`} onClick={(e) => { e.stopPropagation(); onClick?.(e); }} {...rest}>{children}</button>;
}