import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table'

import api from '@/api/Api'
import { TypeOperator } from '@/type/type'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import CommonTable from '@/components/shared/table-common'
import { getColumns } from './components/home-column'
import { useNavigate } from 'react-router-dom'
import ModalAddOperator from '@/components/shared/add-operator'

export default function Home() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [selectedOperator, setSelectedOperator] = useState<TypeOperator | null>(null)
    const [iSLoading, setISLoading] = useState(false)
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])

    const id = localStorage.getItem('id')

    const { data: operators, isLoading } = useQuery(
        ['operators'],
        async () => {
            const response = await api.get('admin/control')

            return response.data
        },
        {
            onError: (error: any) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('role')
                    localStorage.removeItem('id')
                    navigate('/login')
                }
            }
        }
    )

    const columns = getColumns()

    const table = useReactTable({
        data: operators as any,
        columns,
        state: {
            sorting: sorting
        },
        getPaginationRowModel: getPaginationRowModel(),
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
                admin_id: Number(id),
                branch_id: values.branch_id,
                town_id: values.town_id,
                login: values.login,
                password: values.password,
                shifts: [values.shift_id],
                percent: values.percent
            })
            queryClient.invalidateQueries(['operators'])
            setIsCreateDialogOpen(false)
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
