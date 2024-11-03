import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchemaRegister } from './schemas'

export type FormTypeRegister = z.infer<typeof formSchemaRegister>
// const formreg: FormTypeRegister = {
//     email: '', password: ''
// }

export const useFormRegister = () => useForm<FormTypeRegister>({
    resolver: zodResolver(formSchemaRegister)
})
// const {setError,setValue} = userFormRegister()