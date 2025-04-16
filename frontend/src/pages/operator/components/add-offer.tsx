import type React from 'react'
import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { Loader2 } from 'lucide-react'

import api from '@/api/Api'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ModalAddSpend: React.FC<{
    isCreateDialogOpen: boolean
    setIsCreateDialogOpen: (isOpen: boolean) => void
    selectedOperator?: any | null
    onSubmit: (values: any) => void
    iSLoading: boolean
}> = ({ isCreateDialogOpen, setIsCreateDialogOpen, selectedOperator, onSubmit, iSLoading }) => {
    const form = useForm({
        defaultValues: {
            start_time: '',
            end_time: '',
            cost: 0,
            admin_id: 0,
            worker_id: 0,
            town_id: 0,
            operator_id: 0,
            client_name: '',
            description: ''
        }
    })

    useEffect(() => {
        if (!isCreateDialogOpen) {
            form.reset({
                start_time: '',
                end_time: '',
                cost: 0,
                admin_id: 0,
                worker_id: 0,
                town_id: 0,
                operator_id: 0,
                client_name: '',
                description: ''
            })
        }
    }, [isCreateDialogOpen, form])

    const { data: town } = useQuery(
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

    return (
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Добавить</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='start_time'
                            rules={{ required: 'обязателен' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Продлить</FormLabel>

                                    <FormControl>
                                        <Input type='time' {...field} placeholder={'продлить'} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='end_time'
                            rules={{ required: 'обязателен' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Продлить</FormLabel>

                                    <FormControl>
                                        <Input type='time' {...field} placeholder={'продлить'} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
