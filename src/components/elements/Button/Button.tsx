import { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: 'submit' | 'button' | 'reset';
  children?: ReactNode;
}

export const Button = ({ type = 'button', children, ...rest }: ButtonProps) => {
  return (
    <button type={type} {...rest} className={styles.button}>
      {children}
    </button>
  );
};
