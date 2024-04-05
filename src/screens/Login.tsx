import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, MD2Colors, Text, TextInput, TouchableRipple, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '../../store/userSlice'
import { RootState } from '../../store/store'

const Login = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, error } = useSelector((state: RootState) => state.user);


  const handleLogin = () => {
    try {
      if (!email || !password) {
        return console.log('Please provide both email and password');
      }
      dispatch(loginAsync({ email, password }))
    } catch (error) {
      console.log(`error posting user`)
    }
  }

  return (
    <View style={styles.container}>
      {error && <Text variant='titleLarge'>error</Text>}
      <Text variant='titleLarge'>Login</Text>
      <View style={{ paddingTop: 20, rowGap: 15 }}>
        <TextInput
          label="Email"
          mode='outlined'
          style={{ width: 300, paddingHorizontal: 0, backgroundColor: 'white' }}
          outlineColor='black'
          activeOutlineColor='black'
          error={false}
          value={email}
          onChangeText={(text)=>setEmail(text)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          style={{ width: 300, paddingHorizontal: 0, backgroundColor: 'white' }}
          outlineColor='black'
          secureTextEntry
          activeOutlineColor='black'
          value={password}
          onChangeText={(text)=>setPassword(text)}
          right={<TextInput.Icon icon="eye" />}
        />
        <TouchableRipple disabled={loading} rippleColor="rgba(0, 0, 0, .12)" style={{ padding: 15, borderRadius: 4, backgroundColor: 'gray' }} onPress={ handleLogin}>
          {loading ? 
            <ActivityIndicator animating={true} color={MD2Colors.red800} size={25} /> 
            : 
            <Text variant='bodyLarge' style={{ textAlign: 'center', color: 'white' }}>Login</Text>
          }
        </TouchableRipple>
        <Button mode="text"  onPress={() => navigation.navigate('Register')}>
          <Text variant='bodyLarge' style={{ textAlign: 'center', color: 'black' }}>Register if you're new</Text>
        </Button>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})