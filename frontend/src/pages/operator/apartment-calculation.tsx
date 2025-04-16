import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import api from '@/api/Api'
import { TypeBranch } from '@/type/type'

import { getColumns } from './components/apartment-column'
import CommonTable from '@/components/shared/table-common'
import ModalAddSpend from './components/offer-modal'
import { Button } from '@/components/ui/button'
import ModalAddWorker from './components/add-worker'
import ModalComment from './components/comment-modal'

export default function OperatorsPage() {
    const queryClient = useQueryClient()
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [iSLoading, setISLoading] = useState(false)
    const [selected, setSelected] = useState()
    const [addModal, setAddModal] = useState(false)
    const [addLoading, setAddLoading] = useState(false)
    const [offerId, setOfferId] = useState<number | null>(null)
    const [openComment, setOpenComment] = useState<boolean>(false)

    const { data: main, isLoading } = useQuery<TypeBranch[]>(['main'], async () => {
        const response = await api.get('/operator/main')
        return response.data
    })

    const handleEdit = (id: number) => {
        setOfferId(id)
        setOpenComment(true)
    }

    const columns = getColumns({ setOpenModal, setSelected, handleEdit })

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

    const onSubmitComment = async (values: any) => {
        try {
            console.log('val', values)

            await api.post(`offer/create-file/${offerId}`, values, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            queryClient.invalidateQueries(['main'])
            setOpenComment(false)
        } catch (error) {
            console.error(error)
        }
    }

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

    const onSubmitAdd = async (values: any) => {
        try {
            setAddLoading(true)

            await api.post(`/worker/create`, {
                ...values
            })
            queryClient.invalidateQueries(['main'])
            queryClient.invalidateQueries(['workers'])
            setAddModal(false)
        } catch (error) {
            console.error(error)
        } finally {
            setAddLoading(false)
        }
    }

    return (
        <div className='w-full'>
            <div className='flex gap-3 items-center'>
                <Button onClick={() => setAddModal(true)}>Добавить девушку</Button>
                <Button onClick={() => setAddModal(true)}>Добавить предложение</Button>
            </div>

            <CommonTable table={table} columns={columns} isLoading={isLoading} />

            <ModalAddSpend
                isCreateDialogOpen={openModal}
                setIsCreateDialogOpen={setOpenModal}
                onSubmit={onSubmit}
                iSLoading={iSLoading}
                selectedOperator={setSelected}
            />
            <ModalAddWorker
                isCreateDialogOpen={addModal}
                setIsCreateDialogOpen={setAddModal}
                onSubmit={onSubmitAdd}
                iSLoading={addLoading}
            />

            <ModalComment
                isCreateDialogOpen={openComment}
                setIsCreateDialogOpen={setOpenComment}
                onSubmit={onSubmitComment}
            />
        </div>
    )
}
