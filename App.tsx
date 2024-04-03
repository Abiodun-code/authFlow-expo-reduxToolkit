import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Stack = createNativeStackNavigator();

const App = ()=> {

  // const isAuth = useSelector((state: RootState) => state.user.isAuthenticated)

  const dispatch = useDispatch()

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuthentication =  async() => {
     const gettoken = await AsyncStorage.getItem('userToken');
        if (gettoken) {
          // axios.defaults.headers.common['Authorization'] = `Bearer ${gettoken}`;
          setIsAuthenticated(!isAuthenticated);
        }else{
            await AsyncStorage.removeItem('userToken')
          setIsAuthenticated(!isAuthenticated);
        }
      }
  }, []);


  console.log(isAuthenticated)
   
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
        {!isAuthenticated ? (
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
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  )
})