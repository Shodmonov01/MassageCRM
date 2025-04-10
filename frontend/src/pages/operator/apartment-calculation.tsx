import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import api from '@/api/Api'
import { TypeBranch } from '@/type/type'

import { getColumns } from './components/apartment-column'
import CommonTable from '@/components/shared/table-common'
import ModalAddSpend from './components/offer-modal'

export default function OperatorsPage() {
    const queryClient = useQueryClient()
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [iSLoading, setISLoading] = useState(false)
    const [selected, setSelected] = useState()

    const { data: main, isLoading } = useQuery<TypeBranch[]>(['main'], async () => {
        const response = await api.get('/operator/main')
        return response.data
    })

    const columns = getColumns({ setOpenModal, setSelected })
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

    const onSubmit = async (values: any) => {
        try {
            setISLoading(true)
            const formattedTime = `${values.prolongation}:00`

            await api.put(`/offer/update/${selected}?prolongation=${values.prolongation}`)
            queryClient.invalidateQueries(['main'])
            setOpenModal(false)
        } catch (error) {
            console.error(error)
        } finally {
            setISLoading(false)
        }
    }

    return (
        <div className='w-full'>
            <CommonTable table={table} columns={columns} isLoading={isLoading} />

            <ModalAddSpend
                isCreateDialogOpen={openModal}
                setIsCreateDialogOpen={setOpenModal}
                onSubmit={onSubmit}
                iSLoading={iSLoading}
                selectedOperator={setSelected}
            />
        </div>
    )
}
