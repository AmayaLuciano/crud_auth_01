import firebaseApp from '../../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { Button, Container, Text } from '@chakra-ui/react';
import Form from './Form';
import TasksList from './TasksList';
import { useEffect, useState } from 'react';
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ userEmail }) => {
  const [tasks, setTasks] = useState([]);

  const searchOrCreateDocument = async (idDocument) => {
    // crear una referencia al documento
    const docuRef = doc(firestore, `usuarios/${idDocument}`);
    // buscar documento
    const consulta = await getDoc(docuRef);
    // revisar si existe
    if (consulta.exists()) {
      // si si existe
      const infoDoc = consulta.data();
      return infoDoc.value;
    } else {
      // si no existe
      await setDoc(docuRef, { value: [...tasks] });
      const consulta = await getDoc(docuRef);
      const infoDoc = consulta.data();
      return infoDoc.value;
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await searchOrCreateDocument(userEmail);
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  return (
    <Container>
      <Button mt={4} onClick={() => signOut(auth)}>
        Cerrar bzr sesion
      </Button>
      <Form userEmail={userEmail} tasks={tasks} setTasks={setTasks} />
      {tasks ? (
        <TasksList userEmail={userEmail} tasks={tasks} setTasks={setTasks} />
      ) : null}
    </Container>
  );
};

export default Home;
