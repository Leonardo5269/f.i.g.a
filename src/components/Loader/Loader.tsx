import React from 'react';
import styles from './Loader.module.scss';

export default function Loader({ type='dots-loader' }: { type?: 'dots-loader' | 'circle-loader' }) {
  return (
    <div className={styles[type]}>
    </div>
  );
};
