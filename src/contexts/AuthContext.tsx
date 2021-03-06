import {
  Children,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'
import { Api } from '../services/api'

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  email: string
  id: string
  name: string
}

interface AuthState {
  accessToken: string
  user: User
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  accessToken: string
  signIn: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('User Auth must be used within an AuthProvider')
  }

  return context
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem('@Doit:accessToken')
    const user = localStorage.getItem('@Doit:user')

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await Api.post('/login', { email, password })

    const { accessToken, user } = response.data

    localStorage.setItem('@Doit:accessToken', accessToken)
    localStorage.setItem('@Doit:user', JSON.stringify(user))

    setData({ accessToken, user })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth }
