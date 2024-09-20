'use client';
import clsx from 'clsx';
import { FC, forwardRef } from 'react';
import { InputProps } from './Input-type';
import styles from './Input.module.scss';

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChange,
      value,
      placeholder,
      type = 'text', // по умолчанию тип 'text'
      helperText,
      error,
      pending,
      style,
      icon,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={clsx(styles.group, {
          [styles.error]: error,
          [styles.pending]: pending,
        })}
        style={style}
      >
        {type === 'checkbox' ? (
          <label className={styles['input-switch']}>
            <input
              type="checkbox"
              onChange={onChange}
              checked={Boolean(value)} 
              disabled={pending}
              ref={ref}
              {...rest}
            />
            <span className={styles.slider}></span>
          </label>
        ) : (
          <input
            type={type}
            className={styles.input}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            disabled={pending}
            ref={ref}
            {...rest}
          />
        )}
        {icon && <div className={styles.icon}>{icon}</div>}
        {helperText && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
