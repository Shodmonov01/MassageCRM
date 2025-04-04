import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import api from '@/api/Api'
import { TypeBranch, TypeOperator } from '@/type/type'

import { Plus } from 'lucide-react'

import CreateEntityDialog from './components/branch-create'
import { Button } from '@/components/ui/button'
import CommonTable from '@/components/shared/table-common'
import { getColumns } from './components/branch-column'

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

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsCreateDialogOpen(true)
    }

    const columns = getColumns(handleEdit)

    const openCreateDialog = (type: 'branch' | 'town') => {
        setEntityType(type)
        setSelectedOperator(null)
        setIsDialogOpen(true)
    }

    const handleSubmit = async (values: any, type: 'branch' | 'town') => {
        try {
            setIsSubmitting(true)

            if (selectedOperator) {
                await api.put(`super-admin/update-admin/${selectedOperator?.admin_id}`, {
                    login: values.admin_name,
                    password: values.password,
                    branch_id: values.branch_id
                })
            } else {
                if (type === 'branch') {
                    await api.post('/branch/create', {
                        name: values.name
                    })
                } else {
                    await api.post('/town/create', {
                        name: values.name,
                        branch_id: parseInt(values.branch_id)
                    })
                }
            }

            queryClient.invalidateQueries(['branches'])
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

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
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                    <Button onClick={() => openCreateDialog('branch')}>
                        <Plus className='mr-2 h-4 w-4' /> Добавить филиал
                    </Button>
                    <Button onClick={() => openCreateDialog('town')}>
                        <Plus className='mr-2 h-4 w-4' /> Добавить город
                    </Button>
                </div>
            </div>

            <CommonTable table={table} columns={columns} isLoading={isLoading} />

            <CreateEntityDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                entityType={entityType}
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
                branches={branches}
            />
        </div>
    )
}
