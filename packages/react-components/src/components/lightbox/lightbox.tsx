
import { domAnimation, LazyMotion, m } from 'framer-motion';
import {
  CSSProperties, SetStateAction, useCallback, useMemo,
} from 'react';
import { useKeyBindings } from 'rooks';

import { IconButton, OverlayContainer } from '@/components';

import { BlankButton } from '../blank-button';
import styles from './lightbox.module.css';

export type LightboxProps = {
  data: Array<{
    image: string;
    title?: string;
  }>;
  selectedState: [number, React.Dispatch<SetStateAction<number>>];
  isOpen?: boolean;
  onClose: () => void;
  imageWidth?: string;
  imageHeight?: string;
  thumbnailWidth?: string;
  thumbnailHeight?: string;
}

export const Lightbox = ({
  data,
  selectedState,
  isOpen,
  imageWidth = '50vw',
  imageHeight = '80vh',
  thumbnailHeight = '50px',
  thumbnailWidth = '50px',
  onClose,
}: LightboxProps) => {
  const [activeIndex, setActiveIndex] = selectedState;

  const goTo = useCallback((direction: 'prev' | 'next') => {
    const fullLength = data.length - 1;
    switch (direction) {
      case 'prev':
        setActiveIndex(prevState => (prevState === 0 ? 0 : prevState - 1));
        break;
      case 'next':
        setActiveIndex(prevState => (prevState === fullLength ? fullLength : prevState + 1));
        break;
      default:
        setActiveIndex(0);
        break;
    }
  }, [data, setActiveIndex]);

  useKeyBindings({
    ArrowRight: () => goTo('next'),
    ArrowLeft: () => goTo('prev'),
    Escape: () => onClose(),
  });

  const dynamicStyles: CSSProperties = useMemo(() => ({
    '--max-h': imageHeight,
    '--max-w': imageWidth,
    '--thumb-h': thumbnailHeight,
    '--thumb-w': thumbnailWidth,
  }), [imageHeight, imageWidth, thumbnailHeight, thumbnailWidth]);

  return (
    <OverlayContainer onClose={onClose}>
      {isOpen ? (
        <div className={styles.Lightbox} style={dynamicStyles}>
          <IconButton
            className={styles.CloseButton}
            icon="remove"
            aria-label="Close gallery"
            onClick={onClose}
            dimension="big"
            sentiment="danger"
          />
          <div>
            <LazyMotion features={domAnimation}>
              <m.img
                className={styles.Image}
                layout
                transition={{
                  type: 'spring',
                  stiffness: 1000,
                  damping: 50,
                }}
                src={data[activeIndex].image}
                alt={data[activeIndex].title}
              />
            </LazyMotion>
            <IconButton
              className={styles.ArrowRight}
              icon="ctrl-right"
              dimension="big"
              kind="secondary"
              aria-label="Next image"
              onClick={() => goTo('next')}
            />
            <IconButton
              className={styles.ArrowLeft}
              icon="ctrl-left"
              dimension="big"
              kind="secondary"
              aria-label="Previous image"
              onClick={() => goTo('prev')}
            />
          </div>
          <div className={styles.Navigation}>
            {data.map((item, navIndex) => (
              <BlankButton
                aria-hidden="true"
                aria-current={navIndex === activeIndex}
                onClick={() => setActiveIndex(navIndex)}
              >
                <img
                  key={item.image}
                  src={item.image}
                  alt={item.title}
                />
              </BlankButton>
            ))}
          </div>
        </div>
      ) : null}
    </OverlayContainer>
  );
};

