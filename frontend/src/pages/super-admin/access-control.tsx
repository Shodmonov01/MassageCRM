import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import ModalOperator from './components/operator-modal'
import { getColumns } from './components/access-column'
import ModalAddOperator from './components/add-operator'
import CommonTable from '@/components/shared/table-common'

export default function OperatorsPage() {
    const queryClient = useQueryClient()
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [iSLoading, setISLoading] = useState(false)
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])

    const { data: operators, isLoading } = useQuery(['operators'], async () => {
        const response = await api.get('super-admin/operator')
        return response.data
    })

    const handleEdit = (operator: TypeOperator) => {
        setSelectedOperator(operator)
        setIsEditDialogOpen(true)
    }

    const columns = getColumns(handleEdit)

    const onSubmit = async (values: any) => {
        try {
            setISLoading(true)

            await api.put(`super-admin/update-operator/${selectedOperator?.id}`, {
                branch_id: values.branch_id,
                town_id: values.town_name,
                login: values.login,
                password: values.password
            })
            queryClient.invalidateQueries(['operators'])
        } catch (error) {
            console.error(error)
        } finally {
            setISLoading(false)
        }
    }

    const onSubmitAdd = async (values: any) => {
        try {
            setISLoading(true)

            console.log(values)
            await api.post('/super-admin/create-operator', {
                branch_id: values.branch_id,
                admin_id: values.admin_id,
                town_id: values.town_id,
                login: values.login,
                password: values.password,
                shifts: [values.shift_id]
            })
            queryClient.invalidateQueries(['operators'])
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
                <Button onClick={() => setIsCreateDialogOpen(true)} className=''>
                    <Plus className='mr-2 h-4 w-4' /> Создать участника
                </Button>
            </div>

            <CommonTable table={table} columns={columns} isLoading={isLoading} />

            <ModalAddOperator
                isCreateDialogOpen={isCreateDialogOpen}
                setIsCreateDialogOpen={setIsCreateDialogOpen}
                selectedOperator={selectedOperator}
                onSubmit={onSubmitAdd}
                iSLoading={iSLoading}
            />

            <ModalOperator
                isCreateDialogOpen={isEditDialogOpen}
                setIsCreateDialogOpen={setIsEditDialogOpen}
                selectedOperator={selectedOperator}
                onSubmit={onSubmit}
                iSLoading={iSLoading}
            />
        </div>
    )
}
