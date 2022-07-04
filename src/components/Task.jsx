import { HStack, Text, Button, Container } from '@chakra-ui/react';

const Task = ({ task, id, value, deleteTask }) => {
  return (
    <HStack mb={4}>
      <Text>{value}</Text>
      <Button onClick={() => deleteTask(task.id)} colorScheme="green">
        Eliminar
      </Button>
    </HStack>
  );
};

export default Task;
