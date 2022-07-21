import { useNavigation } from '@react-navigation/native';
import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useState } from 'react';

import Logo from '../assets/logo_secondary.svg'
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';


export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
  const [orders, setOrders] = useState<OrderProps[]>([{
    id: '123',
    patrimony: '123456',
    when: '22/10/22 às 14h',
    status: 'open' 
  }])

  const {colors} = useTheme()

  const navigation = useNavigation()

  function handleNewOrder() {
    navigation.navigate('new')
  }

  function handleOrderDetails(orderId: string) {
    navigation.navigate('details', { orderId })
  }

  return (
    <VStack flex={1} pb={16} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton icon={<SignOut size={26} color={colors.gray[300]}/>} />

      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Meus chamados
          </Heading>

          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter type="open" title="em andamento" onPress={() => setStatusSelected('open')} isActive={statusSelected === 'open'} />
          <Filter type="closed" title="finalizados" onPress={() => setStatusSelected('closed')} isActive={statusSelected === 'closed'} />
        </HStack>

        <FlatList 
          data={orders}
          keyExtractor={item => item.id}
          renderItem={(
            { item }) => <Order 
              id={item.id} 
              patrimony={item.patrimony} 
              status={item.status} 
              when={item.when} 
              onPress={() => handleOrderDetails(item.id)}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100}}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="lg" mt={2}>
                Nenhum chamado {statusSelected === 'open' ? 'em andamento' : 'finalizado'}
              </Text>
            </Center>
          )}
        />

        <Button title="Nova Solicitação" onPress={handleNewOrder} />
      </VStack>

    </VStack>
  );
}