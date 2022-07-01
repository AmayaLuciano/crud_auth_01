import { useState } from "react"
import { Container, FormControl, Input, FormLabel, InputGroup, Button, Text, VStack } from "@chakra-ui/react"
import firebaseApp from "../../firebase"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'
const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()

const Logueo = () => {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.input.value
        const password = e.target.password.value
        e.target.input.value = ''
        e.target.password.value = ''

        if(estaRegistrandose){
            const usuario = await createUserWithEmailAndPassword(auth, email, password);
            console.log(usuario)
        } else {
            signInWithEmailAndPassword(auth, email, password)
        }

    }

    return(
        
        <Container>
            <Text mb={4} fontSize={30} fontWeight='bold'>{estaRegistrandose ? 'Registrate' : 'Inicia Sesion'}</Text>
            <form onSubmit={handleSubmit}>
                <FormLabel htmlFor='email'>Correo electronico</FormLabel>
                <Input name="input" onChange={(e) => (e.target.value)} placeholder='Escribe una tarea'/>
                <Input
                    onChange={(e) => (e.target.value)}
                    mt={4}
                    pr='4.5rem'
                    type= 'password'
                    placeholder='Contraseña'
                    id="password"
                />

                <Button type='submit' 
              mt={4} colorScheme='teal' size='md'>
                    {estaRegistrandose ? 'Registrate' : 'Inicia Sesion'}
                </Button>
            </form>

            <VStack alignItems='flex-start'>
                <Button  mt={8} colorScheme='blue' onClick={() => signInWithRedirect(auth, googleProvider)}>Acceder con Google</Button>
                <Button onClick={() => setEstaRegistrandose(!estaRegistrandose)}  mt={4} colorScheme='blue'>{estaRegistrandose ? 'Ya tienes cuenta? Inicia Sesion' : 'No tienes cuenta? Registrate'}</Button>
            </VStack>
        </Container>
    )
}

export default Logueo