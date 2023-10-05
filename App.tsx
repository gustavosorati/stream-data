import 'react-native-reanimated'
import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { useFonts, DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './src/hooks/useAuth';
import { Routes } from './src/routes';
import theme from './src/styles/theme';
import { ThemeProvider } from 'styled-components/native';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded && appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // useEffect(() => {
  //   async function prepare() {
  //     try {       
  //       await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  if (fontsLoaded) {
    return (
      <GestureHandlerRootView
        // onLayout={onLayoutRootView}
        style={{ flex: 1 }}
      >
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <StatusBar style="light" backgroundColor="transparent" translucent />
            <Routes />
          </ThemeProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    
    );
  }
}