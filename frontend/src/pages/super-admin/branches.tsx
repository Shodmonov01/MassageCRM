import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import api from '@/api/Api'
import { TypeBranch, TypeOperator } from '@/type/type'

import { Edit, Loader2, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function OperatorsPage() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)

    const {
        data: branches,
        isLoading,
        error
    } = useQuery<TypeBranch[]>(['branches'], async () => {
        const response = await api.get('/branch')
        return response.data
    })
    console.log('branches', branches)

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }

    if (isLoading)
        return (
            <div className='flex justify-center p-8'>
                <Loader2 />
            </div>
        )

    if (error)
        return (
            <div className='flex justify-center p-8 text-red-500'>
                Error loading branches: {(error as Error).message}
            </div>
        )

    return (
        <div className='w-full'>
            <div className='flex flex-row items-center justify-between'>
                <p>Операторы</p>
                <Button onClick={() => setIsCreateDialogOpen(true)} className='ml-auto'>
                    <Plus className='mr-2 h-4 w-4' /> Добавить филиал
                </Button>
            </div>
            {/* <CardContent> */}
            <Table className='border-collapse [&_th]:border [&_td]:border mt-6'>
                <TableHeader className='!bg-[#f1f1f1]'>
                    <TableRow>
                        <TableHead className='w-[80px]'>ID</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead className='w-[100px] text-center'>Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=''>
                    {branches?.map((operator: TypeBranch) => (
                        <TableRow key={operator.id}>
                            <TableCell>{operator.id}</TableCell>
                            <TableCell>{operator.name}</TableCell>
                            <TableCell className='text-center'>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    // onClick={() => handleEdit(operator)}
                                    className='h-8 w-8'
                                >
                                    <Edit className='h-4 w-4' />
                                    <span className='sr-only'>Редактировать</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* <Modal
                isCreateDialogOpen={isCreateDialogOpen}
                setIsCreateDialogOpen={setIsCreateDialogOpen}
                selectedOperator={selectedOperator}
            /> */}
        </div>
    )
}
