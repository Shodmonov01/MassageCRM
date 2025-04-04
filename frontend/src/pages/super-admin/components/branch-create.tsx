import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { TypeBranch } from '@/type/type'

import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const branchFormSchema = z.object({
    name: z.string().min(1, { message: 'Название филиала обязательно' })
})

const townFormSchema = z.object({
    name: z.string().min(1, { message: 'Название города обязательно' }),
    branch_id: z.string().min(1, { message: 'Выберите филиал' })
})

type EntityType = 'branch' | 'town'

interface CreateEntityDialogProps {
    isOpen: boolean
    onClose: () => void
    entityType: EntityType
    onSubmit: (values: any, entityType: EntityType) => Promise<void>
    isLoading: boolean
    branches?: TypeBranch[]
}

export default function CreateEntityDialog({
    isOpen,
    onClose,
    entityType,
    onSubmit,
    isLoading,
    branches = []
}: CreateEntityDialogProps) {
    const formSchema = entityType === 'branch' ? branchFormSchema : townFormSchema

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            ...(entityType === 'town' && { branch_id: '' })
        }
    })

    useEffect(() => {
        if (isOpen) {
            form.reset({
                name: '',
                ...(entityType === 'town' && { branch_id: '' })
            })
        }
    }, [isOpen, entityType, form])

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        await onSubmit(values, entityType)
        onClose()
        form.reset()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>{entityType === 'branch' ? 'Добавить филиал' : 'Добавить город'}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {entityType === 'branch' ? 'Название филиала' : 'Название города'}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={entityType === 'branch' ? 'Новый филиал' : 'Новый город'}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {entityType === 'town' && (
                            <FormField
                                control={form.control}
                                name='branch_id'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Филиал</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Выберите филиал' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {branches.map(branch => (
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
                        )}

                        <DialogFooter>
                            <Button type='button' variant='outline' onClick={onClose}>
                                Отмена
                            </Button>
                            <Button type='submit' disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Загрузка...
                                    </>
                                ) : (
                                    'Сохранить'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
