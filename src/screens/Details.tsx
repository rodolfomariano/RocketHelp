import { useRoute } from '@react-navigation/native';
import { Text, VStack } from 'native-base';
import { Header } from '../components/Header';

interface RouteParams {
  orderId: string
}

export function Details() {
  const route = useRoute()
  const { orderId } = route.params as RouteParams

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="solicitação" color="gray.200" />
      <Text color="gray.200" >{orderId}</Text>
    </VStack>
  );
}