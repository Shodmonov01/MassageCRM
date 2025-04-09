import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import api from '@/api/Api'
import { TypeBranch } from '@/type/type'

import { getColumns } from './components/apartment-column'
import CommonTable from '@/components/shared/table-common'

export default function OperatorsPage() {
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])

    const { data: main, isLoading } = useQuery<TypeBranch[]>(['main'], async () => {
        const response = await api.get('/operator/main')
        return response.data
    })

    const columns = getColumns()
    console.log('main', main)

    const table = useReactTable({
        data: main as any,
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
            <CommonTable table={table} columns={columns} isLoading={isLoading} />
        </div>
    )
}
