'use client'
import { Role } from "@autospace/util/types"
import { useFormRegister } from '@autospace/forms/src/register'
export interface ISignupFormProps {
    className?: string
    role?: Role
}

export const RegisterForm = ({ className, role }: ISignupFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useFormRegister()
}