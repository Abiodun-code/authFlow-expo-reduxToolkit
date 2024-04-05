import { StyleSheet, View } from 'react-native'
import React from 'react'
import { TouchableRipple, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logoutAsync } from '../../store/userSlice';
import { RootState } from '../../store/store';
const Home = () => {
  
  const dispatch = useDispatch()

  // const data = useSelector((state:RootState)=>state.user)

  const navigation = useNavigation()

  const handleLog = ()=>{
     dispatch(logoutAsync())
  }

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableRipple onPress={handleLog} rippleColor="rgba(0, 0, 0, .12)" style={{ padding: 15, borderRadius: 4, backgroundColor: 'gray' }}>
        <Text variant='bodyLarge' style={{ textAlign: 'center', color: 'white' }}>Logout</Text>
      </TouchableRipple>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})