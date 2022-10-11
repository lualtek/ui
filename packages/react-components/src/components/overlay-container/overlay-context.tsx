import {
  createContext, PropsWithChildren, useContext, useId,
} from 'react';

import { OverlayContainerProps } from './overlay-container';

type OverlayContextProps = Pick<OverlayContainerProps, 'onClose'> & {
  titleId?: string;
}

export const OverlayContext = createContext<OverlayContextProps>({
  titleId: '',
});

OverlayContext.displayName = 'OverlayContext';

export const OverlayProvider = (props: PropsWithChildren<OverlayContextProps>) => {
  const uid = useId();
  const {
    children,
    titleId = `${uid}-overlay-title`, onClose,
  } = props;

  return (
    <OverlayContext.Provider value={{
      titleId,
      onClose,
    }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlayContext = () => {
  const context = useContext(OverlayContext);

  if (!context) {
    console.warn('useOverlayContext: Missing OverlayContext. Please wrap your component in an OverlayProvider.');
  }

  return context;
};
