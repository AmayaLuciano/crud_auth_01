import { Button, HStack, Input } from '@chakra-ui/react';

import { addDoc, getFirestore, updateDoc, doc } from 'firebase/firestore';
import firebaseApp from '../../firebase';
const firestore = getFirestore(firebaseApp);

const Form = ({ userEmail, tasks, setTasks }) => {
  const addTask = async (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;
    const newArray = [...tasks, { id: +new Date(), value: inputValue }];
    if (inputValue !== '') {
      const docuRef = doc(firestore, `usuarios/${userEmail}`);
      updateDoc(docuRef, { value: [...newArray] });
      setTasks(newArray);
    }
    //actualizar base de datos

    e.target.input.value = '';
  };

  return (
    <form onSubmit={addTask}>
      <HStack my={4}>
        <Input id="input" onChange={(e) => e.target.value} />
        <Button type="submit">Agregar</Button>
      </HStack>
    </form>
  );
};

export default Form;
