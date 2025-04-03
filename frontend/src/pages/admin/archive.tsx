import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import { Edit, Loader2, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import FilterDate from '@/components/shared/filter-date'
import Modal from './components/modal'
import FilterTime from '@/components/shared/filter-time'

export default function Archive() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [startDate, setStartDate] = useState<string>(dayjs().hour(12).minute(0).format('HH:mm'))
    const [endDate, setEndDate] = useState<string>(dayjs().hour(20).minute(0).format('HH:mm'))

    const [filtered, setFiltered] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [iSLoading, setISLoading] = useState(false)

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }
    console.log('endDate', endDate)
    console.log('startDate', startDate)

    useEffect(() => {
        const handleFilter = async () => {
            setIsLoading(true)
            try {
                if (startDate && endDate) {
                    const res = await api.get(`/admin/archive?from=${startDate}&to=${endDate}`)
                    console.log(res.data)

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
            console.log('dataa', res.data)
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
            <div className='flex justify-between items-center'>
                <FilterTime
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
            </div>

            <Table className='border-collapse [&_th]:border [&_td]:border mt-6'>
                <TableHeader className='!bg-[#f1f1f1]'>
                    <TableRow>
                        <TableHead className='w-[80px]'>ID</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Время за месяц (часы)</TableHead>
                        <TableHead>Зарплата</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className='w-[100px] text-center'>Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=''>
                    {filtered?.map((operator: any) => (
                        <TableRow key={operator.id}>
                            <TableCell>{operator.admin_id}</TableCell>
                            <TableCell>{operator.admin_name}</TableCell>
                            <TableCell>{operator.branch_name}</TableCell>
                            <TableCell>{operator.total_working_hours}</TableCell>
                            <TableCell>{operator.income}</TableCell>
                            <TableCell>{operator.salary}</TableCell>
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
