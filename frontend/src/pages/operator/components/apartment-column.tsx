import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import api from '@/api/Api'

import Sort from '@/components/shared/sort'
import { Checkbox } from '@/components/ui/checkbox'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'

export const getColumns = ({ setOpenModal, setSelected, handleEdit }: any) => {
    const queryClient = useQueryClient()
    return useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'id',
                header: ({ column }) => <Sort title='№' column={column} />
            },
            {
                accessorKey: 'login',
                header: ({ column }) => <Sort title='Логин' column={column} />
            },
            {
                id: 'time',
                header: ({ column }) => <Sort title='Время' column={column} />,
                cell: ({ row }) => {
                    const start = row.original.start_time || '—'
                    const end = row.original.end_time || '—'
                    return (
                        <div className='whitespace-nowrap'>
                            {start} - {end}
                        </div>
                    )
                }
            },
            {
                accessorKey: 'cost',
                header: ({ column }) => <Sort title='Сумма' column={column} />
            },
            {
                accessorKey: 'login',
                header: ({ column }) => <Sort title='Имя оператора' column={column} />
            },

            {
                accessorKey: 'client_name',
                header: ({ column }) => <Sort title='Имя клиента' column={column} />
            },
            {
                accessorKey: 'is_cancelled',
                header: ({ column }) => <Sort title='Отмена' column={column} />,
                cell: ({ row }) => {
                    const id = row.original.offer_id
                    const isCancelled = row.original.is_cancelled

                    const handleCheckboxChange = async () => {
                        try {
                            await api.delete(`offer/cancel/${id}`)
                            queryClient.invalidateQueries(['main'])
                        } catch (error) {
                            console.error(error)
                        }
                    }

                    return (
                        <Checkbox className='h-6 w-6' checked={!isCancelled} onCheckedChange={handleCheckboxChange} />
                    )
                }
            },
            {
                accessorKey: 'prolongation',
                header: ({ column }) => <Sort title='Продление' column={column} />,
                cell: ({ row }) => {
                    const p = row.original.prolongation

                    return !p ? (
                        <Button
                            onClick={() => {
                                setOpenModal(true), setSelected(row.original.id)
                            }}
                        >
                            Продлить
                        </Button>
                    ) : (
                        <Button>П</Button>
                    )
                }
            },
            {
                accessorKey: 'login',
                header: ({ column }) => <Sort title='Поделить %' column={column} />,
                cell: ({ row }) => {
                    const w = row.original.login

                    return <p>{w} 6%</p>
                }
            },
            {
                accessorKey: 'description',
                header: ({ column }) => <Sort title='Комментарий' column={column} />
            },
            {
                id: 'actions',
                cell: ({ row }: { row: any }) => {
                    const offer_id = row.original.offer_id
                    return (
                        <div className='text-center'>
                            <Button onClick={() => handleEdit(offer_id)}>
                                Комментарий
                                {/* <Edit className='h-4 w-4' /> */}
                            </Button>
                        </div>
                    )
                },
                header: () => <div className='text-center'>Действия</div>
            }
        ],
        [handleEdit]
    )
}
