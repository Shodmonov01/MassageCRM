import type React from 'react'
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import { useQuery } from '@tanstack/react-query'

import api from '@/api/Api'
import type { TypeBranch } from '@/type/type'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

const ModalOperator: React.FC<{
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
            town_name: 0
        }
    })
    console.log('selectedOperator', selectedOperator)

    const { data: branches } = useQuery<TypeBranch[]>(
        ['branches'],
        async () => {
            const response = await api.get('/branch')
            return response.data
        },
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false
        }
    )

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

    useEffect(() => {
        if (selectedOperator) {
            const brandId = branches?.find(b => b.name === selectedOperator.branch_name)?.id
            const townId = town?.find(b => b.name === selectedOperator.town_name)?.id

            form.reset({
                login: selectedOperator.login,
                branch_id: brandId,
                password: '',
                town_name: townId
            })
        }
    }, [selectedOperator])

    return (
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Редактировать оператора</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='login'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Логин</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            rules={{ required: 'Пароль обязателен' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>

                                    <FormControl>
                                        <Input type='password' {...field} placeholder={'Пароль оператора'} />
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

                        <FormField
                            control={form.control}
                            name='town_name'
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
                                            {town?.map((t: any) => (
                                                <SelectItem key={t.id} value={t.id.toString()}>
                                                    {t.name}
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

export default ModalOperator
