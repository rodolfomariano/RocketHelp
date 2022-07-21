import { Box, Circle, HStack, Pressable, Stack, Text, useTheme, VStack, IPressableProps } from 'native-base';
import { CircleWavyCheck, ClockAfternoon, Hourglass } from 'phosphor-react-native';

export interface OrderProps extends IPressableProps {
  id: string
  patrimony: string
  when: string
  status: 'open' | 'closed'
}

export function Order({id, patrimony, when, status, ...rest}: OrderProps) {
  const {colors} = useTheme()

  const statusColor = status === 'open' ? colors.secondary[700] : colors.green[300]

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        // alignContent="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />

        <VStack flex={1} my={5} ml={5}>
          <HStack alignItems="center" mb={1} >
            <ClockAfternoon color={colors.gray[300]} size={14} />
            <Text color="gray.300" fontSize="2xs" ml={1}> {when}</Text>
          </HStack>

          <Text color="gray.300" fontSize="sm">Patrimônio: <Text color={statusColor} fontSize="lg">{patrimony}</Text></Text>

        </VStack>

        <Circle bg="gray.500" h={12} w={12} mr={5} my="auto">
          { status === 'closed'
            ? <CircleWavyCheck size={24} color={statusColor}/>
            : <Hourglass size={24} color={statusColor}/>
          }
        </Circle>
      </HStack>
    </Pressable>
  );
}