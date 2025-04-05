import { useCallback, useEffect, useState } from 'react'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import dayjs from 'dayjs'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import FilterDate from '@/components/shared/filter-date'
import ModalOperator from './components/operator-modal'
import { getColumns } from './components/operator-column'
import CommonTable from '@/components/shared/table-common'

export default function OperatorReport() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
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
    const [iSLoading, setISLoading] = useState(false)
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }

    const columns = getColumns(handleEdit)

    const handleFilter = useCallback(async () => {
        if (!startDate || !endDate) return

        setIsLoading(true)
        try {
            const res = await api.post('/super-admin/operator-filter', {
                from: startDate,
                to: endDate
            })
            setFiltered(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [startDate, endDate])

    useEffect(() => {
        handleFilter()
    }, [handleFilter])

    const onSubmit = async (values: any) => {
        try {
            setISLoading(true)

            const res = await api.put(`/super-admin/update-operator/${selectedOperator?.id}`, {
                branch_id: values.branch_id,
                town_id: values.town_name,
                login: values.login,
                password: values.password
            })
            handleFilter()
            setIsCreateDialogOpen(false)
        } catch (error) {
            console.error(error)
        } finally {
            setISLoading(false)
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

            <ModalOperator
                isCreateDialogOpen={isCreateDialogOpen}
                setIsCreateDialogOpen={setIsCreateDialogOpen}
                selectedOperator={selectedOperator}
                onSubmit={onSubmit}
                iSLoading={iSLoading}
            />
        </div>
    )
}
