import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import { Edit, Loader2, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import FilterDate from '@/components/shared/filter-date'
import ModalAddOperator from './components/add-operator'

export default function OperatorReport() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [startDate, setStartDate] = useState<string | any>(dayjs().subtract(1, 'day').startOf('day').toDate())
    const [endDate, setEndDate] = useState<string | any>(dayjs().endOf('day').toDate())
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
                    const res = await api.post('/super-admin/operator-filter', {
                        from: startDate,
                        to: endDate
                    })
                    setFiltered(res.data)
                    console.log('operator', res.data)
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
            <div className='flex justify-between items-center'>
                <FilterDate
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />

                <Button onClick={() => setIsCreateDialogOpen(true)} className='ml-auto'>
                    <Plus className='mr-2 h-4 w-4' /> Добавить оператор
                </Button>
            </div>

            <Table className='border-collapse [&_th]:border [&_td]:border mt-6'>
                <TableHeader className='!bg-[#f1f1f1]'>
                    <TableRow>
                        <TableHead className='w-[80px]'>ID</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Общая касса</TableHead>
                        <TableHead>Чистая касса</TableHead>
                        <TableHead>Зарплата</TableHead>
                        <TableHead>Касса-зп</TableHead>
                        <TableHead>5%</TableHead>
                        <TableHead>Итог</TableHead>
                        <TableHead className='w-[100px] text-center'>Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=''>
                    {filtered?.map((operator: TypeOperator) => (
                        <TableRow key={operator.id}>
                            <TableCell>{operator.id}</TableCell>
                            <TableCell>{operator.login}</TableCell>
                            <TableCell>{operator.result}</TableCell>
                            <TableCell>{operator.without_spend}</TableCell>
                            <TableCell>{operator.operator_part}</TableCell>
                            <TableCell>{operator.total_amount}</TableCell>
                            <TableCell>{operator.role}</TableCell>
                            <TableCell>{operator.total_amount}</TableCell>
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

            <ModalAddOperator
                isCreateDialogOpen={isCreateDialogOpen}
                setIsCreateDialogOpen={setIsCreateDialogOpen}
                selectedOperator={selectedOperator}
                onSubmit={onSubmit}
                iSLoading={iSLoading}
            />
        </div>
    )
}
