'use client'
import { useFormLogin } from '@autospace/forms/src/login'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export interface ILoginFormProps {
    className?: string
}

export const LoginForm = ({
    // className
}: ILoginFormProps) => {
    const { replace } = useRouter()
    const { register, handleSubmit, formState: { errors } } = useFormLogin()

    console.log('errors', errors)
    return (
        <Form onSubmit={handleSubmit(async (data) => {
            console.log('data', data)
            const { email, password } = data
            const result = await signIn('credentials', {
                email, password, redirect: false
            })
            if (result?.ok) {
                replace('/')
            }
            if (result?.error) {
                alert("Login failed. Try again.")
            }
        })}>
            <HtmlLabel title='Email' error={errors.email?.message}>
                <HtmlInput {...register('email')} placeholder='email' />
            </HtmlLabel>
            <HtmlLabel title='Password' error={errors.password?.message} optional>
                <HtmlInput type='password' {...register('password')} placeholder='******' />
            </HtmlLabel>
            <Button type='submit'>Submit</Button>
            <div className='mt-4 text-sm'>
                Do not have an autospace account? {' '}
                <Link
                    href="/register"
                    className='font-bold underline underline-offset-4'
                >
                    Create one
                </Link> {' '}
                now.
            </div>
        </Form>
    )
} 