import React from 'react';
import  './slide.css'
import { useTranslation } from 'react-i18next';
import { Carousel } from 'antd';
const contentStyle = {
  height: '250px',
  fontSize: '60px',
  color: 'rgb(200, 200, 200)',
  fontFamily: 'serif',
  textShadow : "1.3px 1.3px white",
  lineHeight: '250px',
  textAlign: 'center',
  margin: '0'
};
const ShowSlide = () => {
  const { t } = useTranslation();
  return (
    <Carousel  className='contentStyle' autoplay>
      <div>
        <h3 style={contentStyle}>{t('Performance')}</h3>
      </div>
    </Carousel>
  )
};
export default ShowSlide;