import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, MD2Colors, Text, TextInput, TouchableRipple } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { registerAsync } from '../../store/userSlice'
import { RootState } from '../../store/store'

const Register = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')

  const {loading, error} = useSelector((state: RootState) => state.user);


  const handleRegister =  () => {
    try {
      if (!email || !password) {
        return console.log('Please provide both email and password');
      }
      dispatch(registerAsync({ email, password }))
      navigation.navigate('Login')
    } catch (error) {
      console.log( `error posting user`)
    }
  }

  return (
    <View style={styles.container}>
      <Text variant='titleLarge'>Register</Text>
      <View style={{paddingTop: 20, rowGap:15}}>
        <TextInput
          label="Email"
          mode='outlined'
          style={{ width: 300, paddingHorizontal :0, backgroundColor: 'white'}}
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
          onChangeText={(text)=>setPasword(text)}
          right={<TextInput.Icon icon="eye" />}
        />
        <TouchableRipple disabled={loading} rippleColor="rgba(0, 0, 0, .12)" style={{ padding:15, borderRadius: 4, backgroundColor: 'gray' }} onPress={ handleRegister}>
          {loading ?
            <ActivityIndicator animating={true} color={MD2Colors.red800} size={25} />
            :
            <Text variant='bodyLarge' style={{ textAlign: 'center', color: 'white' }}>Register</Text>
          }
        </TouchableRipple>
      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})