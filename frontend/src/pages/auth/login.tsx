import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import api from '@/api/Api'
import { useNavigate } from 'react-router'

const formSchema = z.object({
    login: z.string().nonempty({ message: 'Введите логин' }),
    password: z.string().nonempty({ message: 'Введите пароль' })
})

type UserFormValue = z.infer<typeof formSchema>

const Login = () => {
    const navigate = useNavigate()

    const role = localStorage.getItem('role')

    useEffect(() => {
        if (role) {
            navigate('/')
        }
    }, [role])

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: '',
            password: ''
        }
    })

    const onSubmit = async (values: UserFormValue) => {
        try {
            const res = await api.post('all-login', values)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('role', res.data.result.role)
            // if (res.data.result.role === 'admin') navigate('/home')
            // if (res.data.result.role === 'super_admin') navigate('/accessControl')
            // if (res.data.result.role === 'operator') navigate('/apartmentCalculation')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen py-24 flex justify-center'>
            <div>
                <div className='flex xl:w-[450px] shadow-lg border-2 border-gray-100 rounded-xl justify-center flex-col items-center p-10 gap-12 '>
                    <p className='text-[32px]'>Вход</p>
                    <div className='w-full'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full '>
                                <FormField
                                    control={form.control}
                                    name='login'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Логин</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Введите логин' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Пароль</FormLabel>
                                            <FormControl>
                                                <Input type='password' placeholder='Введите пароль' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button variant='default' type='submit' className='w-full !mt-8'>
                                    Войти
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
