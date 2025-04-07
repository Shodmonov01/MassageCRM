import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import Sort from '@/components/shared/sort'

export const getColumns = () => {
    return useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'admin_id',
                header: ({ column }) => <Sort title='№' column={column} />
            },
            {
                accessorKey: 'admin_name',
                header: ({ column }) => <Sort title='Имя' column={column} />
            },
            {
                accessorKey: 'branch_name',
                header: ({ column }) => <Sort title='Время' column={column} />
            },
            {
                accessorKey: 'total_working_hours',
                header: ({ column }) => <Sort title='Сумма' column={column} />
            },
            {
                accessorKey: 'income',
                header: ({ column }) => <Sort title='Имя оператора' column={column} />
            },
            {
                accessorKey: 'salary',
                header: ({ column }) => <Sort title='Имя клиента' column={column} />
            },
            {
                accessorKey: 'salary',
                header: ({ column }) => <Sort title='Отмена' column={column} />
            },
            {
                accessorKey: 'salary',
                header: ({ column }) => <Sort title='Продление' column={column} />
            },
            {
                accessorKey: 'salary',
                header: ({ column }) => <Sort title='Поделить %' column={column} />
            },
            {
                accessorKey: 'salary',
                header: ({ column }) => <Sort title='Комментарий' column={column} />
            }
        ],
        []
    )
}
