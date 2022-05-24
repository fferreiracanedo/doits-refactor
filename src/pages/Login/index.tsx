import {
  Heading,
  Flex,
  Text,
  Grid,
  Image,
  VStack,
  Button,
  Box
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { FaEnvelope, FaLock, FaRegistered } from 'react-icons/fa'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { string } from 'yup/lib/locale'
import LogoSecondary from '../../assets/secondary-logo.svg'
import { Input } from '../../components/Form/Input'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { SignInCredentials } from '../../contexts/AuthContext'

export const Login = () => {
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()

  const singInSchema = yup.object().shape({
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    password: yup.string().required('Senha obrigatória')
  })

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm({
    resolver: yupResolver(singInSchema)
  })

  const handlesingin = (data: SignInCredentials) => {
    setLoading(true)
    signIn(data).then(_ => setLoading(false))
  }

  return (
    <Flex
      padding={['10px 15px', '10px 15px', '0px', '0px']}
      alignItems="center"
      justifyContent="center"
      height={['auto', 'auto', '100vh', '100vh']}
      bgGradient={[
        'linear(to-b, purple.800 65%,white 35%)',
        'linear(to-b, purple.800 65%,white 35%)',
        'linear(to-r, purple.800 65%,white 35%)'
      ]}
      color="white"
    >
      <Flex
        w={['100%', '100%', '90%', '65%']}
        justifyContent="center"
        flexDir={['column', 'column', 'row', 'row']}
        alignItems="center"
      >
        <Grid w={['100%', '100%', '50%', '50%']} pr="100px">
          <Image
            src={LogoSecondary}
            alt="Logo-doIT"
            boxSize={['120px', '120px', '150px', '150px']}
          ></Image>
          <Heading mt="4" as="h1">
            O jeito fácil,grátis
          </Heading>
          <Text maxW="350px">Flexível e atrativo de gerenciar</Text>
          <b>seus projetos em uma única plataforma</b>
        </Grid>
        <Grid
          onSubmit={handleSubmit(handlesingin)}
          as="form"
          mt={['4', '4', '0']}
          w={['100%', '100%', '40%', '40%']}
          padding="30px 15px"
          border="3px solid"
          borderColor="gray.100"
          bg="white"
          color="gray.900"
        >
          <Heading size="lg">Bem vindo de volta</Heading>
          <VStack spacing="5" mt="6">
            <Box w="100%">
              <Input
                placeholder="Digite seu Login"
                label="login"
                type="email"
                error={errors.email}
                icon={FaEnvelope}
                {...register('email')}
              />
              {!errors.email && (
                <Text ml="1" mt="1" color="gray.300">
                  Exemplo : nome@email.com
                </Text>
              )}
            </Box>
            <Input
              placeholder="Digite sua Senha"
              icon={FaLock}
              {...register('password')}
              type="password"
              error={errors.password}
            />
          </VStack>
          <VStack mt="4" spacing="5">
            <Button
              isLoading={loading}
              type="submit"
              bg="purple.800"
              w="100%"
              _hover={{ background: 'purple.900' }}
              color="white"
              h="60px"
              borderRadius="8px"
            >
              Entrar
            </Button>
            <Text color="gray.400">Ainda não possui uma conta?</Text>
            <Button
              bg="gray.100"
              w="100%"
              _hover={{ background: 'gray.200' }}
              color="gray.300"
              h="60px"
              borderRadius="8px"
            >
              Cadastrar
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  )
}
