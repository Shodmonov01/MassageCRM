import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import { Edit, Loader2, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Modal from './components/accessModal'
import { useNavigate } from 'react-router-dom'

export default function OperatorsPage() {
    const navigate = useNavigate()
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [iSLoading, setISLoading] = useState(false)

    const {
        data: operators,
        isLoading,
        error
    } = useQuery(['operators'], async () => {
        const response = await api.get('super-admin/operator')
        return response.data
    })

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }
    console.log('operators', operators)

    if (isLoading)
        return (
            <div className='flex justify-center p-8'>
                <Loader2 />
            </div>
        )

    if (error) {
        localStorage.removeItem('token')
        navigate('/login')
        return (
            <div className='flex justify-center p-8 text-red-500'>
                Error loading operators: {(error as Error).message}
            </div>
        )
    }

    const onSubmit = async (values: any) => {
        try {
            setISLoading(true)

            const res = await api.put(`super-admin/update-operator/${selectedOperator?.id}`, values)
            console.log(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setISLoading(false)
        }
    }

    return (
        <div className='w-full'>
            <div className='flex flex-row items-center justify-between'>
                <Button className=''>
                    <Plus className='mr-2 h-4 w-4' /> Создать участника
                </Button>
            </div>
            <Table className='border-collapse [&_th]:border [&_td]:border mt-6'>
                <TableHeader className='!bg-[#f1f1f1]'>
                    <TableRow>
                        <TableHead className='w-[80px]'>ID</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Филиал</TableHead>
                        <TableHead>Роль</TableHead>
                        <TableHead className='w-[100px] text-center'>Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=''>
                    {operators?.map((operator: TypeOperator) => (
                        <TableRow key={operator.id}>
                            <TableCell>{operator.id}</TableCell>
                            <TableCell>{operator.login}</TableCell>
                            <TableCell>{operator.branch_name}</TableCell>
                            <TableCell>{operator.role}</TableCell>
                            <TableCell className='text-center'>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() => handleEdit(operator)}
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

            <Modal
                isCreateDialogOpen={isCreateDialogOpen}
                setIsCreateDialogOpen={setIsCreateDialogOpen}
                selectedOperator={selectedOperator}
                onSubmit={onSubmit}
                iSLoading={iSLoading}
            />
        </div>
    )
}
