import * as z from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
    login: z.string().nonempty({ message: 'Введите логин' }),
    password: z.string().nonempty({ message: 'Введите пароль' })
})

type UserFormValue = z.infer<typeof formSchema>

const Login = () => {
    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: 'login',
            password: 'password'
        }
    })

    const onSubmit = (values: UserFormValue) => {
        console.log('Login', values)
    }

    return (
        <div className='flex justify-center flex-col items-center p-10 gap-12'>
            <p className='text-[32px]'>Вход</p>
            <div className='xl:w-[530px]'>
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

                        <Button variant='default' type='submit' className='w-full'>
                            Войти
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login
