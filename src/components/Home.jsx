import firebaseApp from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { Button, Container, Text } from "@chakra-ui/react";
const auth = getAuth(firebaseApp)

const Home = () => {
    return (
        <Container>
            <Text>Hola, sesion inciada bb</Text>
            <Button onClick={() => signOut(auth)}>Cerrar bzr sesion</Button>
        </Container>
    )
}

export default Home;