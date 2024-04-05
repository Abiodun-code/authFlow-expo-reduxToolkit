import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { persistor, RootState, store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import { checkLoginStatus } from './store/userSlice';

const Stack = createNativeStackNavigator();

const App = ()=> {

  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginStatus()); // Dispatch checkLoginStatus action when the component mounts
  }, [dispatch]);

  console.log(isAuth)
   
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
        {isAuth ? (
          <Stack.Screen name='Home' component={Home}/>
        ):
          (<>
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Login' component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default(()=>{
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
})