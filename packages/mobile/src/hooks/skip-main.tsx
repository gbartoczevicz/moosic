import React, { useEffect, createContext, useState, useCallback, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@moosic/can_skip_main';

interface Context {
  canSkipMain: boolean;
  updateCanSkipMain: (value: boolean) => Promise<void>;
}

interface CanSkipMainState {
  canSkipMainScreen: boolean;
}

const CanSkipMainContext = createContext<Context>({} as Context);

export const CanSkipMainProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CanSkipMainState>({} as CanSkipMainState);

  useEffect(() => {
    async function loadStorage() {
      const canSkipMain = await AsyncStorage.getItem(STORAGE_KEY);

      if (canSkipMain === null) {
        setData({ canSkipMainScreen: false });

        return;
      }

      setData(JSON.parse(canSkipMain));
    }

    loadStorage();
  }, []);

  const updateCanSkipMain = useCallback(async (toSetValue: boolean) => {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        canSkipMainScreen: toSetValue
      })
    );
  }, []);

  return (
    <CanSkipMainContext.Provider value={{ canSkipMain: data.canSkipMainScreen, updateCanSkipMain }}>
      {children}
    </CanSkipMainContext.Provider>
  );
};

export function useCanSkipMain(): Context {
  const context = useContext(CanSkipMainContext);

  if (!context) {
    throw new Error('useAuth must be used within an CanSkipMainProvider');
  }

  console.log('useCanSkipMain', context);

  return context;
}
