import { Button, Container, HStack, Text } from '@chakra-ui/react';
import firebaseApp from '../../firebase';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import Task from './Task';
const firestore = getFirestore(firebaseApp);

const TasksList = ({ tasks, setTasks, userEmail }) => {
  const deleteTask = async (taskId) => {
    const newArray = tasks.filter((task) => task.id !== taskId);

    const docuRef = doc(firestore, `usuarios/${userEmail}`);
    updateDoc(docuRef, { value: [...newArray] });

    setTasks(newArray);
  };

  return (
    <Container>
      {tasks.map((task) => {
        return (
          <Task
            deleteTask={deleteTask}
            value={task.value}
            task={task}
            id={task.id}
            key={task.id}
          />
        );
      })}
    </Container>
  );
};

export default TasksList;
