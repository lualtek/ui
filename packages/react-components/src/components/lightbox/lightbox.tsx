'use client';

import { domAnimation, LazyMotion, m } from 'motion/react';
import {
  FC, SetStateAction, useCallback, useMemo,
} from 'react';
import { FocusOn } from 'react-focus-on';
import { useKeyPressEvent } from 'react-use';

import {
  BlankButton,
  IconButton, Overlay, OverlayProps,
} from '@/components';

import styles from './lightbox.module.css';

export type LightboxProps = {
  /**
   * Array of objects containing the image url and optional title
   */
  data: Array<{
    image: string;
    title?: string;
  }>;
  /**
   * State for the active index of the lightbox
   */
  selectedState: [number, React.Dispatch<SetStateAction<number>>];
  /**
   * Width of the zoomed image
   *
   * @defaultValue "50vw"
   */
  imageWidth?: string;
  /**
   *  Height of the zoomed image
   *
   * @defaultValue "80vh"
   */
  imageHeight?: string;
  /**
   * Width of the thumbnail element inside the navigation
   *
   * @defaultValue "50px"
   */
  thumbnailWidth?: string;
  /**
   * Height of the thumbnail element inside the navigation
   *
   * @defaultValue "50px"
   */
  thumbnailHeight?: string;
  /**
   * Set the visibility of the lightbox
   */
  isOpen?: boolean;
  /**
   * Set the z-index of the lightbox
   */
  index?: OverlayProps['index'];
  /**
   * Callback for closing the lightbox
   */
  onClose: NonNullable<OverlayProps['onClose']>;
}

const navAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const thumbAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const Lightbox: FC<LightboxProps> = ({
  data,
  selectedState,
  imageWidth = '50vw',
  imageHeight = '80vh',
  thumbnailHeight = '50px',
  thumbnailWidth = '50px',
  onClose,
  isOpen,
  index,
}) => {
  // const { onClose } = useOverlayContext();
  const [activeIndex, setActiveIndex] = selectedState;
  const isFirst = useMemo(() => activeIndex === 0, [activeIndex]);
  const isLast = useMemo(() => activeIndex === data.length - 1, [data, activeIndex]);

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

  useKeyPressEvent('ArrowRight', () => goTo('next'));
  useKeyPressEvent('ArrowLeft', () => goTo('prev'));
  useKeyPressEvent('Escaper', () => onClose?.());

  const dynamicStyles = useMemo(() => ({
    '--max-h': imageHeight,
    '--max-w': imageWidth,
    '--thumb-h': thumbnailHeight,
    '--thumb-w': thumbnailWidth,
  }), [imageHeight, imageWidth, thumbnailHeight, thumbnailWidth]);

  return (
    <Overlay onClose={onClose} backdropOpacity={0.9} index={index}>
      {isOpen && (
        <FocusOn onEscapeKey={onClose}>
          <m.div className={styles.Lightbox} style={dynamicStyles}>
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
                  initial={{
                    scale: 0.8,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                  }}
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
                disabled={isLast}
                onClick={() => goTo('next')}
              />
              <IconButton
                className={styles.ArrowLeft}
                icon="ctrl-left"
                dimension="big"
                kind="secondary"
                disabled={isFirst}
                aria-label="Previous image"
                onClick={() => goTo('prev')}
              />
            </div>
            <m.div
              className={styles.Navigation}
              variants={navAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {data.map((item, navIndex) => (
                <BlankButton
                  key={item.image}
                  aria-hidden="true"
                  aria-current={navIndex === activeIndex}
                  onClick={() => setActiveIndex(navIndex)}
                >
                  <m.img
                    variants={thumbAnimation}
                    key={item.image}
                    src={item.image}
                    alt={item.title ?? ''}
                  />
                </BlankButton>
              ))}
            </m.div>
          </m.div>
        </FocusOn>
      )}
    </Overlay>
  );
};

