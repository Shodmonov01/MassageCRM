import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import api from '@/Api'
import { TypeOperator } from '@/type/type'

import { Edit, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Modal from './components/accessModal'
import FilterDate from '@/components/shared/filter-date'

export default function AdminReport() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [startDate, setStartDate] = useState<Date | undefined>(dayjs().subtract(1, 'day').startOf('day').toDate())
    const [endDate, setEndDate] = useState<Date | undefined>(dayjs().endOf('day').toDate())
    const [filtered, setFiltered] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [iSLoading, setISLoading] = useState(false)

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }

    useEffect(() => {
        const handleFilter = async () => {
            setIsLoading(true)
            try {
                if (startDate && endDate) {
                    const res = await api.post('/super-admin/admin-filter', {
                        from: startDate,
                        to: endDate
                    })
                    setFiltered(res.data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        handleFilter()
    }, [startDate, endDate])

    const onSubmit = async (values: any) => {
        try {
            setISLoading(true)

            const res = await api.put(`super-admin/update-admin/${selectedOperator?.id}`, values)
            console.log(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setISLoading(false)
        }
    }

    if (isLoading)
        return (
            <div className='flex justify-center p-8'>
                <Loader2 />
            </div>
        )

    return (
        <div className='w-full'>
            <FilterDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

            <Table className='border-collapse [&_th]:border [&_td]:border mt-6'>
                <TableHeader className='!bg-[#f1f1f1]'>
                    <TableRow>
                        <TableHead className='w-[80px]'>ID</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Филиал</TableHead>
                        <TableHead>Время</TableHead>
                        <TableHead>Доход</TableHead>
                        <TableHead>Зарплата</TableHead>
                        <TableHead className='w-[100px] text-center'>Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=''>
                    {filtered?.map((operator: TypeOperator) => (
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
