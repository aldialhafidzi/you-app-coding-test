import { forwardRef } from 'react';
import styles from "./select.module.css"

type Option = {
    label: string;
    value: string | number;
};

type SelectProps = {
    name: string;
    options: Option[];
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    variant?: 'normal' | 'outline'
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    name,
    options,
    placeholder = 'Pilih salah satu...',
    required = false,
    disabled = false,
    className,
    variant = 'outline',
    ...props
}, ref) => {
    return (
        <div className={`${styles['select-wrapper']} ${styles[variant]}`}>
            <select
                id={name}
                name={name}
                ref={ref}
                disabled={disabled}
                required={required}
                className={`${styles['select']} ${className} ${!props?.value && 'text-white/50'}`}
                {...props}
            >
                <option value="" disabled hidden>{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
