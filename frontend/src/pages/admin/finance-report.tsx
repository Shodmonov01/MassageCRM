import { useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import dayjs from 'dayjs'
import { Plus } from 'lucide-react'

import api from '@/api/Api'
import { TypeBranch, TypeOperator } from '@/type/type'

import { Button } from '@/components/ui/button'
import CommonTable from '@/components/shared/table-common'
import FilterDate from '@/components/shared/filter-date'
import { getColumns } from './components/branch-column'
import ModalAddSpend from './components/add-spend'

export default function FinanceReport() {
    const queryClient = useQueryClient()
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [entityType, setEntityType] = useState<'branch' | 'town'>('branch')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])
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
    const [iSLoading, setISLoading] = useState(false)
    const [filtered, setFiltered] = useState<any[]>([])

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }

    const columns = getColumns(handleEdit)

    const onSubmit = async (values: any) => {
        try {
            await api.post('spend/create', values)

            setIsSubmitting(true)
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const table = useReactTable({
        data: filtered,
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

    const handleFilter = useCallback(async () => {
        setISLoading(true)
        try {
            if (startDate && endDate) {
                const res = await api.get(`/admin/spend?from=${startDate}&to=${endDate}`)
                console.log('resdata', res.data)

                setFiltered(res.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setISLoading(false)
        }
    }, [startDate, endDate])

    useEffect(() => {
        handleFilter()
    }, [handleFilter])

    return (
        <div className='w-full'>
            <div className='flex flex-row items-center justify-between'>
                <FilterDate
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                />
                <div className='flex flex-row items-center gap-3'>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className='mr-2 h-4 w-4' /> Создать
                    </Button>
                </div>
            </div>

            <CommonTable table={table} columns={columns} isLoading={iSLoading} />

            <ModalAddSpend
                isCreateDialogOpen={isCreateDialogOpen}
                setIsCreateDialogOpen={setIsCreateDialogOpen}
                selectedOperator={selectedOperator}
                onSubmit={onSubmit}
                iSLoading={iSLoading}
            />
        </div>
    )
}
