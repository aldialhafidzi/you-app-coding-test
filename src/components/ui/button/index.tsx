type ButtonProps = {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
};

import styles from "./button.module.css"

const Button: React.FC<ButtonProps> = ({
    children,
    type = 'button',
    onClick,
    disabled = false,
    loading = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={styles['button']}
        >
            {loading ? 'Loading...' : children}
        </button>
    );
};

export default Button;
