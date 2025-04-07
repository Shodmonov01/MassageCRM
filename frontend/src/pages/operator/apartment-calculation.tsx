import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import api from '@/api/Api'
import { TypeBranch, TypeOperator } from '@/type/type'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import CommonTable from '@/components/shared/table-common'
import { getColumns } from './components/apartment-column'

export default function OperatorsPage() {
    const queryClient = useQueryClient()
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [entityType, setEntityType] = useState<'branch' | 'town'>('branch')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])

    const { data: branches, isLoading } = useQuery<TypeBranch[]>(['branches'], async () => {
        const response = await api.get('/branch')
        return response.data
    })

    const columns = getColumns()

    const table = useReactTable({
        data: branches as any,
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
