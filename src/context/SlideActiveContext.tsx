import { createContext, useContext } from 'react';

export const SlideActiveContext = createContext(true);
export const useSlideActive = () => useContext(SlideActiveContext);
