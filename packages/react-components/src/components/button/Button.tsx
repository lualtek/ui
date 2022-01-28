import style from './button.module.css';

export const Button: React.FC<{disabled?: boolean}> = ({ children, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    className={style.Color}
  >
    {children}
  </button>
);
