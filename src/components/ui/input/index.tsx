type InputProps = {
    name: string
    type?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    required?: boolean
    trailing?: React.ReactNode
    leading?: React.ReactNode
    variant?: 'normal' | 'outline'
    className?: string
    disabled?: boolean
};

import { forwardRef } from "react";
import styles from "./input.module.css"

const Input = forwardRef<HTMLInputElement, InputProps>(({
    name,
    type = 'text',
    placeholder = '',
    required = false,
    className,
    variant = 'normal',
    leading = <></>,
    trailing = <></>,
    ...props
}, ref) => {
    return (
        <div className={`${styles['input-wrapper']} ${styles[variant]}`}>
            {leading}

            <input
                ref={ref}
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                required={required}
                className={`${styles['input']} ${className}`}
                {...props}
            />

            {trailing}
        </div>
    );
});

Input.displayName = 'Input'

export default Input;
