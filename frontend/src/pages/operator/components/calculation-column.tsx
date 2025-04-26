import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import Sort from '@/components/shared/sort'

export const getColumns = () => {
    return useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'login',
                header: ({ column }) => <Sort title='Мастер' column={column} />
            },
            {
                accessorKey: 'operator_part',
                header: ({ column }) => <Sort title='Доход' column={column} />
            },
            {
                accessorKey: 'operator_part',
                header: ({ column }) => <Sort title='Процент' column={column} />
            },
            {
                accessorKey: 'operator_part',
                header: ({ column }) => <Sort title='Коментарий' column={column} />
            }
        ],
        []
    )
}
