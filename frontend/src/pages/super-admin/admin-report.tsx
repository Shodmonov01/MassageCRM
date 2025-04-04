import { useEffect, useMemo, useState } from 'react'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useQueryClient } from '@tanstack/react-query'

import dayjs from 'dayjs'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import Modal from './components/admin-modal'
import FilterDate from '@/components/shared/filter-date'
import { getColumns } from './components/admin-column'
import CommonTable from '@/components/shared/table-common'

export default function AdminReport() {
    const queryClient = useQueryClient()

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [startDate, setStartDate] = useState<string | any>(dayjs().subtract(1, 'day').startOf('day').toDate())
    const [endDate, setEndDate] = useState<string | any>(dayjs().endOf('day').toDate())
    const [filtered, setFiltered] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [iSLoading, setISLoading] = useState(false)
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }

    const columns = getColumns(handleEdit)

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

    useEffect(() => {
        handleFilter()
    }, [startDate, endDate])

    const onSubmit = async (values: any) => {
        try {
            setISLoading(true)

            await api.put(`super-admin/update-admin/${selectedOperator?.admin_id}`, {
                login: values.admin_name,
                password: values.password,
                branch_id: values.branch_id
            })
            queryClient.invalidateQueries(['admins'])
            await handleFilter()
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
