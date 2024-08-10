import React, { ComponentPropsWithRef, ReactNode } from 'react';

interface Props extends ComponentPropsWithRef<'button'> {
  text?: string;
  callback?: () => any;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export default function Button({ text, className, callback, icon, iconPosition, type, loading }: Readonly<Props>) {
  return (
    <button className={className} onClick={callback} type={type} disabled={loading}>
      {iconPosition === 'left' && icon}
      {text}
      {iconPosition === 'right' && icon}
    </button>
  );
}
