'use client';

import React from 'react';
import { FormLabel, InputAdornment, OutlinedInput } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Control, Controller } from 'react-hook-form';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface Props {
  label?: string;
  placeholder?: string;
  htmlFor?: string;
  control: Control<any>;
  name: string;
  max?: number;
}

export default function InputEmailForm({ label, placeholder, htmlFor, name, control, max }: Props) {
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
              placeholder={placeholder}
              type={'email'}
              inputProps={{ name: htmlFor, id: htmlFor, maxLength: max }}
              sx={{
                borderWidth: '1px',
                borderRadius: '8px',
                borderColor: errors?.[name] ? '#F53D3D' : '#E0E0E0',
                [`& #${htmlFor}`]: {
                  padding: '10px 14px 10px 0',
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
              startAdornment={
                <InputAdornment position='start'>
                  <MailOutlineIcon sx={{ color: '#9E9E9E', fontSize: 20 }} />
                </InputAdornment>
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
