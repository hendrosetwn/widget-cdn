import React from 'react';
import { Box } from '@mui/material';
import Button from './Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ICarousell } from '@interfaces/carousell';
import Image from 'next/image';
import { API_URL_PREVIEW_FILE } from '@utils/environment';

interface WidgetProps {
  type: 'customer' | 'user';
  data: ICarousell;
  handleClick: (e: string) => void;
}

interface CardProps {
  title: string;
  description: string;
  image: string;
  onCardClick: () => void;
}

const CardComponent = ({ title, description, image, onCardClick }: Readonly<CardProps>) => (
  <div className='w-[230px] flex flex-col items-center rounded-[6px] border shadow-custom1'>
    {image ? (
      <Image
        src={`${API_URL_PREVIEW_FILE}/${image}`}
        width={200}
        height={200}
        alt='logo'
        objectFit='cover'
        objectPosition='center'
        className='rounded-[6px] m-4 h-[120px] w-[200px]'
      />
    ) : (
      <Box sx={{ backgroundColor: '#D9D9D9', height: 120, width: 200, margin: 2, borderRadius: 0.75 }}></Box>
    )}
    <div className='self-start pl-4'>
      <h4 className='text-xs text-neutral90 font-semibold'>{title}</h4>
      <p className='text-xs text-[#818286]'>{description}</p>
    </div>

    <div className='p-4 w-full'>
      <Button
        callback={onCardClick}
        className='w-full bg-neutral10 p-[6px] rounded-[6px] text-neutral90 font-medium shadow-custom2 hover:shadow-custom3 text-xs'
        text='Mulai Percakapan'
        type='button'
      />
    </div>
  </div>
);

const CardGridWidget = ({ data, type, handleClick }: Readonly<WidgetProps>) => {
  const dataIsActive = data.cardMenu.filter((item) => item.isActive);

  return (
    <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>
      <Swiper
        spaceBetween={0}
        slidesPerView={type == 'customer' ? 1.4 : 2.2}
        pagination={{ clickable: true }}
        style={{ paddingBottom: 16, paddingTop: 16, cursor: 'pointer' }}
      >
        {dataIsActive.map((item, index) => (
          <SwiperSlide key={index}>
            <CardComponent
              title={item.menuTitle}
              description={item.menuDesc}
              image={item.imagePath}
              onCardClick={() => handleClick(item.buttonValue)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CardGridWidget;
