import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { SignIn } from '../screens/SignIn';
import { AppRoutes } from "./app.routes";
import { Loading } from "../components/Loading";

export function Routes() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<FirebaseAuthTypes.User>()

  if(loading) {
    return <Loading />
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(response => {
      setUser(response)
      setLoading(false)
    })

    return subscriber
  }, [])

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}