import type React from 'react'

import { useForm } from 'react-hook-form'

import { useQuery } from '@tanstack/react-query'

import api from '@/api/Api'
import type { TypeBranch } from '@/type/type'

import { Loader2 } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'

const ModalAddWorker: React.FC<{
    isCreateDialogOpen: boolean
    setIsCreateDialogOpen: (isOpen: boolean) => void
    onSubmit: (values: any) => void
    iSLoading: boolean
}> = ({ isCreateDialogOpen, setIsCreateDialogOpen, onSubmit, iSLoading }) => {
    const form = useForm({
        defaultValues: {
            name: '',
            percent: 0
        }
    })

    useEffect(() => {
        if (!isCreateDialogOpen) {
            form.reset({
                name: '',
                percent: 0
            })
        }
    }, [isCreateDialogOpen, form])

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
                            name='name'
                            rules={{ required: 'Пароль обязателен' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>

                                    <FormControl>
                                        <Input {...field} placeholder={'Имя'} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='percent'
                            rules={{ required: 'Пароль обязателен' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Процент</FormLabel>

                                    <FormControl>
                                        <Input type='number' {...field} placeholder={'Процент'} />
                                    </FormControl>

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

export default ModalAddWorker
