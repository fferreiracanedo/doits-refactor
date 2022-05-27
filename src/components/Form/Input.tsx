import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup
} from '@chakra-ui/react'
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  ForwardRefRenderFunction,
  forwardRef
} from 'react'
import { FieldError } from 'react-hook-form'
import { IconType } from 'react-icons'
import { FaExclamation } from 'react-icons/fa'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldError | null
  icon?: IconType
}

type inputVariationsOptions = {
  [key: string]: string
}

const inputVariation: inputVariationsOptions = {
  error: 'red.500',
  default: 'gray.200',
  focus: 'purple.800',
  filled: 'green.500'
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { icon: Icon, name, error = null, label, ...rest },
  ref
) => {
  const [variation, setVariation] = useState('default')
  const [value, setValue] = useState('')

  useEffect(() => {
    if (error) {
      return setVariation('error')
    }
  }, [error])

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation('focus')
    }
  }, [error])

  const handleInputBluer = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation('filled')
    }
  }, [error, value])

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel>{label}</FormLabel>}

      <InputGroup flexDirection="column">
        {Icon && (
          <InputLeftElement color={inputVariation[variation]} mt="2.5">
            <Icon />
          </InputLeftElement>
        )}

        <ChakraInput
          name={name}
          color={inputVariation[variation]}
          borderColor={inputVariation[variation]}
          bg="gray.50"
          variant="outline"
          onFocus={handleInputFocus}
          onChangeCapture={e => setValue(e.currentTarget.value)}
          onBlurCapture={handleInputBluer}
          __hover={{ bgColor: 'gray.100' }}
          __placeholder={{ color: 'gray.300' }}
          size="lg"
          h="60px"
          ref={ref}
          {...rest}
        />
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  )
}
export const Input = forwardRef(InputBase)
