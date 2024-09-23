import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'submit' | 'button';
}

export const Button = ({ text, type = 'button', onClick }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};
