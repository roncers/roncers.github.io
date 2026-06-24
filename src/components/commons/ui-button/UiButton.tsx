import styles from './UiButton.module.css';

export default function UiButton({ children, className, onMouseDown, ...rest }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className={`${styles.uiButton} ${className || ''} h-full`} onMouseDown={(e) => { e.stopPropagation(); onMouseDown?.(e); }} {...rest}>{children}</button>;
}