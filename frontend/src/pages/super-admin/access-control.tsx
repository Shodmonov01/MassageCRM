import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import { Edit, Loader2, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Modal from './components/admin-modal'
import CommonTable from '@/components/shared/table-common'
import { getColumns } from './components/access-column'

export default function OperatorsPage() {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [iSLoading, setISLoading] = useState(false)
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])

    const { data: operators, isLoading } = useQuery(['operators'], async () => {
        const response = await api.get('super-admin/operator')
        return response.data
    })

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }

    const columns = getColumns(handleEdit)

    const onSubmit = async (values: any) => {
        try {
            setISLoading(true)

            const res = await api.put(`super-admin/update-operator/${selectedOperator?.id}`, values)
        } catch (error) {
            console.error(error)
        } finally {
            setISLoading(false)
        }
    }

    const table = useReactTable({
        data: operators,
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
            <div className='flex flex-row items-center justify-between'>
                <Button className=''>
                    <Plus className='mr-2 h-4 w-4' /> Создать участника
                </Button>
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
