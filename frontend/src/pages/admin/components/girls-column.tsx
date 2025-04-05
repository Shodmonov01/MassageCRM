import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import Sort from '@/components/shared/sort'

export const getColumns = () => {
    return useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'worker_id',
                header: ({ column }: { column: any }) => {
                    return <Sort title='ID' column={column} />
                }
            },
            {
                accessorKey: 'login',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Дата' column={column} />
                }
            },
            {
                accessorKey: 'worker_name',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Имя' column={column} />
                }
            },
            {
                accessorKey: 'worker_name',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Telegram' column={column} />
                }
            },
            {
                accessorKey: 'role',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Количество смен' column={column} />
                }
            },
            {
                accessorKey: 'total_working_hours',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Часы' column={column} />
                }
            },
            {
                accessorKey: 'all_guest',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Гости' column={column} />
                }
            },
            {
                accessorKey: 'cancelled',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Отмены' column={column} />
                }
            },
            {
                accessorKey: 'worker_part',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Доход' column={column} />
                }
            },
            {
                accessorKey: 'total_working_hours',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Прибыль' column={column} />
                }
            }
        ],
        []
    )
}
