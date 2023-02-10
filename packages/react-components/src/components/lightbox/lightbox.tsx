
import { SetStateAction, useCallback } from 'react';

import { IconButton } from '../icon-button';
import styles from './lightbox.module.css';

type LightboxProps = {
  data: Array<{
    id: string;
    image: string;
    title: string;
  }>;
  selectedState: [number, React.Dispatch<SetStateAction<number>>];
  isOpen?: boolean;
  onClose: () => void;
  imageWidth?: number;
  imageHeight?: number;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
}

export const Lightbox = ({
  data,
  selectedState,
  isOpen,
  imageHeight,
  imageWidth,
  thumbnailHeight,
  thumbnailWidth,
  onClose,
}: LightboxProps) => {
  const [index, setIndex] = selectedState;

  const goTo = useCallback((direction: 'prev' | 'next') => {
    const fullLength = data.length - 1;
    switch (direction) {
      case 'prev':
        setIndex(prevState => (prevState === 0 ? 0 : prevState - 1));
        break;
      case 'next':
        setIndex(prevState => (prevState === fullLength ? fullLength : prevState + 1));
        break;
      default:
        setIndex(0);
        break;
    }
  }, [data, setIndex]);

  return isOpen ? (
    <div className={styles.reactLightboxContainer}>
      <div className={styles.reactLightboxCloseButtonContainer}>
        <IconButton className={styles.reactLightboxCloseButton} icon="arrow-right" onClick={onClose} />
      </div>
      <div>
        <img
          src={data[index].image}
          alt={data[index].title}
          style={{ maxHeight: imageHeight, maxWidth: imageWidth }}
        />
        <div className={styles.reactLightboxArrowRight}>
          <IconButton
            icon="arrow-right"
            className={styles.reactLightboxButton}
            onClick={() => goTo('next')}
          />
        </div>
        <div className={styles.reactLightboxArrowLeft}>
          <IconButton
            icon="arrow-left"
            className={styles.reactLightboxButton}
            onClick={() => goTo('prev')}
          />
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {data.map((item, index) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.title}
            height={thumbnailHeight}
            width={thumbnailWidth}
            style={{
              objectFit: 'cover',
              margin: '0 0.5rem',
              borderRadius: '0.2rem',
            }}
            onClick={() => setIndex(index)}
          />
        ))}
      </div>
    </div>
  ) : null;
};

