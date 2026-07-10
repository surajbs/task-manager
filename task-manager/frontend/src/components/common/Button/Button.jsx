import "./Button.css";

function Button({
    children,
    variant = "primary",
    type = "button",
    disabled = false,
    loading = false,
    fullWidth = false,
    onClick,
}) {
    return (
        <button
            type={type}
            className={`
                btn
                btn-${variant}
                ${fullWidth ? "btn-full" : ""}
            `}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
}

export default Button;