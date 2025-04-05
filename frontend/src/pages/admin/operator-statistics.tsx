import { useEffect, useState } from 'react'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import dayjs from 'dayjs'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import FilterDate from '@/components/shared/filter-date'
import { getColumns } from './components/operator-column'
import CommonTable from '@/components/shared/table-common'

export default function OperatorStatistics() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [startDate, setStartDate] = useState<string>(dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD'))
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])
    const [endDate, setEndDate] = useState<string>(dayjs().endOf('day').format('YYYY-MM-DD'))
    const [filtered, setFiltered] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }

    const columns = getColumns()

    useEffect(() => {
        const handleFilter = async () => {
            setIsLoading(true)
            try {
                if (startDate && endDate) {
                    const res = await api.post(`/admin/operator-filter`, {
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

    const table = useReactTable({
        data: filtered as any,
        columns,
        state: {
            sorting: sorting
        },
        onSortingChange: (updater: any) => {
            if (typeof updater === 'function') {
                setSorting(updater(sorting))
            } else {
                setSorting(updater)
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

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

            <CommonTable table={table} columns={columns} isLoading={isLoading} />
        </div>
    )
}
