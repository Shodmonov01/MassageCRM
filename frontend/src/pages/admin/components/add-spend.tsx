import type React from 'react'
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import { useQuery } from '@tanstack/react-query'

import api from '@/api/Api'
import type { TypeBranch } from '@/type/type'

import { Loader2 } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ModalAddSpend: React.FC<{
    isCreateDialogOpen: boolean
    setIsCreateDialogOpen: (isOpen: boolean) => void
    selectedOperator: any | null
    onSubmit: (values: any) => void
    iSLoading: boolean
}> = ({ isCreateDialogOpen, setIsCreateDialogOpen, selectedOperator, onSubmit, iSLoading }) => {
    const form = useForm({
        defaultValues: {
            login: '',
            password: '',
            branch_id: 0,
            admin_id: 0,
            town_id: 0,
            operator_id: 0,
            cost: 0,
            category: ''
        }
    })

    const { data: branches } = useQuery<TypeBranch[]>(['branches'], async () => {
        const response = await api.get('/branch')
        return response.data
    })

    const { data: town } = useQuery<TypeBranch[]>(
        ['town'],
        async () => {
            const response = await api.get('town')
            return response.data
        },
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false
        }
    )

    const { data: shift } = useQuery<TypeBranch[]>(
        ['shift'],
        async () => {
            const response = await api.get('/shift')
            return response.data
        },
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false
        }
    )

    useEffect(() => {
        if (selectedOperator) {
            const brandId = branches?.find(b => b.name === selectedOperator.branch_name)?.id

            form.reset({
                login: selectedOperator.login,
                branch_id: brandId,
                password: ''
            })
        }
    }, [selectedOperator])

    return (
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Добавить оператор</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='cost'
                            rules={{ required: 'Пароль обязателен' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cost</FormLabel>

                                    <FormControl>
                                        <Input {...field} placeholder={''} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='category'
                            rules={{ required: 'Категория обязателен' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Категория</FormLabel>

                                    <FormControl>
                                        <Input {...field} placeholder={'категория'} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='branch_id'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Филиал</FormLabel>
                                    <Select
                                        onValueChange={value => field.onChange(Number.parseInt(value))}
                                        value={field.value ? field.value.toString() : undefined}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Выберите филиал' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {branches?.map((branch: any) => (
                                                <SelectItem key={branch.id} value={branch.id.toString()}>
                                                    {branch.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* <FormField
                            control={form.control}
                            name='admin_id'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Админ</FormLabel>
                                    <Select
                                        onValueChange={value => field.onChange(Number.parseInt(value))}
                                        value={field.value ? field.value.toString() : undefined}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Выберите админ' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {admins?.map((a: any, index: number) => (
                                                <SelectItem key={index + a.id} value={a.id.toString()}>
                                                    {a.login}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        <FormField
                            control={form.control}
                            name='town_id'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Город</FormLabel>
                                    <Select
                                        onValueChange={value => field.onChange(Number.parseInt(value))}
                                        value={field.value ? field.value.toString() : undefined}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Выберите админ' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {town?.map((a: any, index: number) => (
                                                <SelectItem key={index + a.id} value={a.id.toString()}>
                                                    {a.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='operator_id'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Смена</FormLabel>
                                    <Select
                                        onValueChange={value => field.onChange(Number.parseInt(value))}
                                        value={field.value ? field.value.toString() : undefined}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Выберите админ' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {shift?.map((a: any, index: number) => (
                                                <SelectItem key={index + a.id} value={a.id.toString()}>
                                                    {a.description}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className='pt-4'>
                            <Button type='button' variant='outline' onClick={() => setIsCreateDialogOpen(false)}>
                                Отмена
                            </Button>
                            <Button type='submit' disabled={iSLoading}>
                                {iSLoading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    </>
                                ) : selectedOperator ? (
                                    'Сохранить'
                                ) : (
                                    'Создать'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ModalAddSpend
