import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, getSortedRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table'

import api from '@/api/Api'
import { TypeBranch } from '@/type/type'

import { getColumns } from './components/apartment-column'
import CommonTable from '@/components/shared/table-common'
import ModalAddSpend from './components/offer-modal'
import { Button } from '@/components/ui/button'
import ModalAddWorker from './components/add-worker'
import ModalComment from './components/comment-modal'
import ModalAddOffer from './components/add-offer'

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
    const [openOffer, setOpenOffer] = useState<boolean>(false)
    const [addLoadingOffer, setAddLoadingOffer] = useState<boolean>(false)
    const town = localStorage.getItem('town_id')
    const branch = localStorage.getItem('branch_id')
    const operator = localStorage.getItem('id')
    const admin = localStorage.getItem('admin_id')

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

    const onSubmitComment = async (values: any) => {
        try {
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

    const onSubmitOffer = async (values: any) => {
        try {
            setAddLoadingOffer(true)

            await api.post(`/offer/create`, {
                ...values,
                cost: Number(values.cost),
                start_time: `${values.start_time}:00`,
                end_time: `${values.end_time}:00`,
                admin_id: Number(admin),
                town_id: Number(town),
                operator_id: Number(operator),
                branch_id: Number(branch)
            })
            queryClient.invalidateQueries(['main'])
            setOpenOffer(false)
        } catch (error) {
            console.error(error)
        } finally {
            setAddLoadingOffer(false)
        }
    }

    const onSubmit = async (values: any) => {
        try {
            setISLoading(true)

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
                ...values,
                branch_id: Number(branch),
                town_id: Number(town),
                operator_id: Number(operator)
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
                <Button onClick={() => setOpenOffer(true)}>Добавить предложение</Button>
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

            <ModalAddOffer
                isCreateDialogOpen={openOffer}
                setIsCreateDialogOpen={setOpenOffer}
                onSubmit={onSubmitOffer}
                iSLoading={addLoadingOffer}
            />
        </div>
    )
}
