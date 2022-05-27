import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { AppProviderProps } from '../Interfaces/Interfaces'
import { AuthProvider } from './AuthContext'

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </AuthProvider>
)
