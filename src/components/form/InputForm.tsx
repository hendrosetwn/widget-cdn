import React, { HTMLProps } from 'react';
import { FormLabel, InputAdornment, OutlinedInput } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface Props extends HTMLProps<HTMLDivElement> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  htmlFor?: string;
  type?: 'text' | 'number';
  control: Control<any>;
  name: string;
  max?: number;
  smallSize?: boolean;
}

export default function InputForm({
  label,
  placeholder,
  htmlFor,
  control,
  name,
  disabled,
  type,
  min,
  max,
  smallSize,
  maxLength,
  defaultValue,
}: Readonly<Props>) {
  const widthStyle = maxLength ? `w-[${maxLength}px]` : 'w-full';

  return (
    <div className={`flex flex-col gap-[6px] ${widthStyle}`}>
      <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <>
            <FormLabel htmlFor={htmlFor} sx={{ color: '#404040', fontSize: 14, fontWeight: 500 }}>
              {label}
            </FormLabel>
            <OutlinedInput
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              type={type ?? 'text'}
              inputProps={{ name: htmlFor, id: htmlFor, min, maxLength: max }}
              sx={{
                backgroundColor: disabled ? '#F3F3F3' : 'transparent',
                borderWidth: '1px',
                borderRadius: '8px',
                borderColor: errors?.[name] ? '#F53D3D' : '#E0E0E0',
                [`& #${htmlFor}`]: {
                  padding: `${smallSize ? '8px' : '10px'} 14px`,
                  fontSize: 14,
                  color: '#404040',
                },
              }}
              endAdornment={
                errors?.[name] && (
                  <InputAdornment position='end'>
                    <ErrorOutlineOutlinedIcon sx={{ color: '#F53D3D', fontSize: 20 }} />
                  </InputAdornment>
                )
              }
            />
            {errors?.[name]?.message && (
              <span className='text-xs text-error'>{errors?.[name]?.message?.toString()}</span>
            )}
          </>
        )}
      />
    </div>
  );
}
