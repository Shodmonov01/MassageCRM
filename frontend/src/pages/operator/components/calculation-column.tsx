import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import Sort from '@/components/shared/sort'

export const getColumns = () => {
    return useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'id',
                header: ({ column }) => <Sort title='ID' column={column} />
            },
            {
                accessorKey: 'login',
                header: ({ column }) => <Sort title='Логин' column={column} />
            },
            {
                id: 'branch_name',
                header: ({ column }) => <Sort title='Филиал' column={column} />
            },
            {
                accessorKey: 'town_name',
                header: ({ column }) => <Sort title='Город' column={column} />
            },
            {
                accessorKey: 'operator_part',
                header: ({ column }) => <Sort title='Зарплата' column={column} />
            },

            {
                accessorKey: 'without_spend',
                header: ({ column }) => <Sort title='Чистая касса' column={column} />
            },
            {
                accessorKey: 'result',
                header: ({ column }) => <Sort title='Итог' column={column} />
            }
        ],
        []
    )
}
