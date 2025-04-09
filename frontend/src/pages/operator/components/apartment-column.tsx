import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import api from '@/api/Api'

import Sort from '@/components/shared/sort'
import { Checkbox } from '@/components/ui/checkbox'
import { useQueryClient } from '@tanstack/react-query'

export const getColumns = () => {
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
                accessorKey: 'cost',
                header: ({ column }) => <Sort title='Сумма' column={column} />
            },
            {
                accessorKey: 'worker_name',
                header: ({ column }) => <Sort title='Имя оператора' column={column} />
            },
            {
                accessorKey: 'branch_name',
                header: ({ column }) => <Sort title='Филиал' column={column} />
            },
            {
                accessorKey: 'client_name',
                header: ({ column }) => <Sort title='Имя клиента' column={column} />
            },
            {
                accessorKey: 'is_cancelled',
                header: ({ column }) => <Sort title='Отмена' column={column} />,
                cell: ({ row }) => {
                    const id = row.original.id
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
                accessorKey: 'operator_part',
                header: ({ column }) => <Sort title='Доля оператора' column={column} />
            },
            {
                accessorKey: 'start_time',
                header: ({ column }) => <Sort title='Время начала' column={column} />
            },
            {
                accessorKey: 'end_time',
                header: ({ column }) => <Sort title='Время окончания' column={column} />
            }
        ],
        []
    )
}
