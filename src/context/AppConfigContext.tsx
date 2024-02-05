'use client';

import React, { createContext, useContext } from 'react';

import { AppConfig } from '@/config/AppConfig'; // Import site configuration

interface AppConfigContextType {
  config: typeof AppConfig;
}

const AppConfigContext = createContext<AppConfigContextType | undefined>(undefined);

export const useAppConfig = (): AppConfigContextType => {
  const context = useContext(AppConfigContext);
  if (!context) {
    throw new Error('useAppConfig must be used within an AppConfigProvider');
  }
  return context;
};

interface AppConfigProviderProps {
  children: React.ReactNode;
}

const appConfigValue = { config: AppConfig };

export const AppConfigProvider: React.FC<AppConfigProviderProps> = ({ children }) => {
  return (
    <AppConfigContext.Provider value={appConfigValue}>
      {children}
    </AppConfigContext.Provider>
  );
};
