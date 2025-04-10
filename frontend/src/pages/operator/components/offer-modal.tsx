import type React from 'react'

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
    selectedOperator?: any | null
    onSubmit: (values: any) => void
    iSLoading: boolean
}> = ({ isCreateDialogOpen, setIsCreateDialogOpen, selectedOperator, onSubmit, iSLoading }) => {
    const form = useForm({
        defaultValues: {
            prolongation: ''
        }
    })

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
                            name='prolongation'
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
