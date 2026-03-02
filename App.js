import React from 'react';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
export default function App() {
return (
// O Provider envolve o app inteiro
<AppProvider>
<AppNavigator />
</AppProvider>
);
}