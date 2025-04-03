import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import { Edit, Loader2, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import FilterDate from '@/components/shared/filter-date'

export default function GirlsStatistics() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [startDate, setStartDate] = useState<string>(dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD'))

    const [endDate, setEndDate] = useState<string>(dayjs().endOf('day').format('YYYY-MM-DD'))
    const [filtered, setFiltered] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }

    useEffect(() => {
        const handleFilter = async () => {
            setIsLoading(true)
            try {
                if (startDate && endDate) {
                    const res = await api.get(`/admin/statistic-worker?from=${startDate}&to=${endDate}`)
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
            </div>

            <Table className='border-collapse [&_th]:border [&_td]:border mt-6'>
                <TableHeader className='!bg-[#f1f1f1]'>
                    <TableRow>
                        <TableHead className='w-[80px]'>ID</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Telegram</TableHead>
                        <TableHead>Количество смен</TableHead>
                        <TableHead>Часы</TableHead>
                        <TableHead>Гости</TableHead>
                        <TableHead>Отмены</TableHead>
                        <TableHead>Доход</TableHead>
                        <TableHead>Прибыль</TableHead>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
