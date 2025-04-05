import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Modal from './components/modal'
import CommonTable from '@/components/shared/table-common'
import { getColumns } from './components/home-column'
import ModalAddOperator from './components/add-operator'

export default function Home() {
    const queryClient = useQueryClient()
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [iSLoading, setISLoading] = useState(false)
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])

    const {
        data: operators,
        isLoading,
        error
    } = useQuery(['operators'], async () => {
        const response = await api.get('admin/control')
        return response.data
    })

    const columns = getColumns()

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
        data: operators as any,
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

    const onSubmitAdd = async (values: any) => {
        try {
            setISLoading(true)

            console.log(values)
            await api.post('/admin/add-operator', {
                branch_id: values.branch_id,
                admin_id: values.admin_id,
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

    return (
        <div className='w-full'>
            <div className='flex flex-row items-center justify-between'>
                <Button onClick={() => setIsCreateDialogOpen(true)} className=''>
                    <Plus className='mr-2 h-4 w-4' /> Создать нового оператора
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
        </div>
    )
}
