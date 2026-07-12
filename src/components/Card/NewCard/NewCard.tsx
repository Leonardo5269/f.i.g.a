'use client';

import React from 'react';
import styles from './NewCard.module.scss';
import { useRouter } from 'next/navigation';

type Timestamp = string | number;

export default function NewCard({
  imgUrl,
  timestamp,
  title
}: {
  imgUrl: string;
  timestamp: Timestamp;
  title: string;
}) {
  const router = useRouter();

  const formatTimeStamp = (timeStamp: Timestamp): string => {
    const newTimeStamp = String(timeStamp).slice(0, 10);
    const arrDate = newTimeStamp.split('-');
    return arrDate.reverse().join('-');
  }
  return (
    <div className={`${styles['new-card']}`} onClick={() => router.push(`/dashboard/news/${timestamp}`)}>
      <div className={styles['up-card']}>
        <img alt='new-image' src={imgUrl} />
        {/* creare settings component */}
      </div>
      <div className={styles.content}>
        <span className='secondary-text font-size-small'>{formatTimeStamp(timestamp)}</span>
        <h4 className='mt-xxs font-weight-medium'>{title}</h4>
      </div>
    </div>
  );
};
