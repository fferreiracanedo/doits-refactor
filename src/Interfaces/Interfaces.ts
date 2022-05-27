import { ReactNode } from "react"

export interface ISignData {
  email: string
  password: string
}

export interface AppProviderProps {
  children: ReactNode
}
