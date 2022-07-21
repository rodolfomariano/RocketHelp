import { useState } from 'react'
import { Heading, Icon, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import auth from '@react-native-firebase/auth'

import Logo from '../assets/logo_primary.svg'
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Alert } from 'react-native';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const { colors } = useTheme()

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe email e senha!')
    }

    setIsLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false)
        
      }).catch(error => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'|| error.code === 'auth/invalid-email') {
          setIsLoading(false)
          return Alert.alert('Entrar', 'Email ou senha inválido!')
        }
        console.log(error)
        setIsLoading(false)
        return Alert.alert('Entrar', 'Não foi possível acessar')
      })
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input 
        placeholder="E-mail" 
        mb={4} 
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />} 
        onChangeText={setEmail}
      />

      <Input 
        placeholder="Senha" 
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />} 
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button 
        title="Entrar" 
        w="full" 
        mt={8} 
        onPress={handleSignIn} 
        isLoading={isLoading}
      />

    </VStack>
  )
}