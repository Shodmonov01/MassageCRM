import type React from 'react'
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import { Upload, X } from 'lucide-react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const ModalComment: React.FC<{
    isCreateDialogOpen: boolean
    setIsCreateDialogOpen: (isOpen: boolean) => void
    onSubmit: (values: any) => void
}> = ({ isCreateDialogOpen, setIsCreateDialogOpen, onSubmit }) => {
    const [files, setFiles] = useState<any[]>([])

    const form = useForm({
        defaultValues: {
            file: '',
            description: ''
        }
    })

    useEffect(() => {
        if (!isCreateDialogOpen) {
            form.reset({
                file: '',
                description: ''
            })
            setFiles([])
        }
    }, [isCreateDialogOpen, form])

    const handleSubmit = (values: any) => {
        const formData = new FormData()

        formData.append('description', values.description)

        files.forEach((file, index) => {
            formData.append(`file`, file)
        })

        onSubmit(formData)
    }

    return (
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent className='sm:max-w-[500px] p-0 overflow-hidden bg-gray-50 rounded-3xl border-none'>
                <div className='p-6 space-y-6'>
                    <h3 className='text-lg font-medium'>Оставить комментарий</h3>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                            <FormField
                                control={form.control}
                                name='description'
                                rules={{ required: 'обязателен' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder='Оставить комментарий'
                                                className='min-h-[160px] border-gray-200 rounded-xl resize-none focus:ring-gray-300 focus:border-gray-300'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div>
                                <FormLabel className='font-medium'>Прикрепить файлы</FormLabel>

                                <div className='space-y-4'>
                                    <label
                                        htmlFor='file-upload'
                                        className='mt-4 inline-block cursor-pointer w-full text-gray-500 hover:text-gray-700'
                                    >
                                        <div className='border-2 border-dashed border-gray-200 rounded-xl p-8 text-center'>
                                            <div className='flex justify-center'>
                                                <div className='bg-gray-200 p-4 rounded-full'>
                                                    <Upload className='h-8 w-8 text-gray-400' />
                                                </div>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name='file'
                                                render={({ field: { value, onChange, ...field } }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type='file'
                                                                className='hidden'
                                                                id='file-upload'
                                                                multiple
                                                                onChange={e => {
                                                                    const selectedFiles = e.target.files
                                                                    if (selectedFiles) {
                                                                        const filesArray = Array.from(selectedFiles)
                                                                        setFiles(filesArray)
                                                                        field.onChange(selectedFiles)
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </label>

                                    {files.length > 0 && (
                                        <div className='mt-4'>
                                            <div className='grid grid-cols-4 gap-3'>
                                                {files.map((file, idx) => (
                                                    <div key={idx} className='relative group'>
                                                        <div className='h-20 w-full rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center'>
                                                            {file.type.startsWith('image/') ? (
                                                                <img
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={file.name}
                                                                    className='h-full w-full object-cover'
                                                                />
                                                            ) : (
                                                                <div className='text-xs text-center p-2 text-gray-500'>
                                                                    <div className='truncate max-w-full'>
                                                                        {file.name}
                                                                    </div>
                                                                    <div>{(file.size / 1024).toFixed(1)} KB</div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <button
                                                            type='button'
                                                            onClick={() =>
                                                                setFiles(prev => prev.filter((_, i) => i !== idx))
                                                            }
                                                            className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                                                        >
                                                            <X className='h-3 w-3' />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='flex justify-end gap-3 pt-2'>
                                <Button type='button' variant='outline' onClick={() => setIsCreateDialogOpen(false)}>
                                    Отмена
                                </Button>
                                <Button type='submit'>Сохранить</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ModalComment
