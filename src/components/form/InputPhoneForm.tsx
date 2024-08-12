'use client';

import React, { useEffect, useState } from 'react';
import { FormLabel, InputAdornment, OutlinedInput } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface Props {
  label?: string;
  placeholder?: string;
  htmlFor?: string;
  watchValue?: string;
  control: Control<any>;
  name: string;
  max?: number;
}

export default function InputPhoneForm({
  label,
  placeholder,
  htmlFor,
  control,
  name,
  watchValue = '',
  max,
}: Readonly<Props>) {
  const [displayValue, setDisplayValue] = useState<string>('');

  useEffect(() => {
    if (watchValue.startsWith('0')) {
      setDisplayValue(watchValue.substring(1));
    } else {
      setDisplayValue(watchValue.replace('+62', ''));
    }
  }, [watchValue]);

  return (
    <div className='flex flex-col w-full gap-[6px]'>
      <Controller
        defaultValue={''}
        control={control}
        name={name}
        render={({ field, formState: { errors } }) => (
          <>
            <FormLabel htmlFor={htmlFor} sx={{ color: '#404040', fontSize: 14, fontWeight: 500 }}>
              {label}
            </FormLabel>
            <OutlinedInput
              {...field}
              value={displayValue}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, '').replace(/^0/, '');
                field.onChange(newValue);
              }}
              placeholder={placeholder}
              inputProps={{ name: htmlFor, id: htmlFor, maxLength: max }}
              sx={{
                paddingLeft: 0,
                borderWidth: '1px',
                borderRadius: '8px',
                borderColor: errors?.[name] ? '#F53D3D' : '#E0E0E0',
                [`& #${htmlFor}`]: {
                  padding: '10px 14px 10px 7px',
                  fontSize: 14,
                  color: '#404040',
                },
              }}
              startAdornment={
                <InputAdornment
                  position='start'
                  sx={{
                    backgroundColor: '#EDEDED',
                    padding: '20px 10px',
                    margin: 0,
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                  }}
                >
                  <span className='text-sm text-neutral90'>+62</span>
                </InputAdornment>
              }
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
