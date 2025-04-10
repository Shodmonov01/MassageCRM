import { useEffect, useState } from 'react'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import dayjs from 'dayjs'

import api from '@/api/Api'

import FilterDate from '@/components/shared/filter-date'
import CommonTable from '@/components/shared/table-common'
import { getColumns } from './components/girls-column'

export default function GirlsStatistics() {
    const [startDate, setStartDateRaw] = useState<string>(
        dayjs().subtract(1, 'day').startOf('day').format('YYYY-MM-DD')
    )
    const [endDate, setEndDateRaw] = useState<string>(dayjs().endOf('day').format('YYYY-MM-DD'))

    const setStartDate = (date: any) => {
        if (date) {
            const formattedDate = dayjs(date).format('YYYY-MM-DD')
            setStartDateRaw(formattedDate)
        } else {
            setStartDateRaw('')
        }
    }

    const setEndDate = (date: any) => {
        if (date) {
            const formattedDate = dayjs(date).format('YYYY-MM-DD')
            setEndDateRaw(formattedDate)
        } else {
            setEndDateRaw('')
        }
    }

    const [filtered, setFiltered] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])

    const columns = getColumns()

    useEffect(() => {
        const handleFilter = async () => {
            setIsLoading(true)
            try {
                if (startDate && endDate) {
                    const res = await api.get(`/admin/statistic-worker?from=${startDate}&to=${endDate}`)

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
