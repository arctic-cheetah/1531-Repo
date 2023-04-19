import React from 'react';
import { themes } from './theme';

export const DarkModeContext = React.createContext({
  isDark: false,
  theme: themes.light,
});

export const DarkModeProvider = DarkModeContext.Provider;
export const DarkModeConsumer = DarkModeContext.Consumer;


