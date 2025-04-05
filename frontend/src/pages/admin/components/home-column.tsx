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
                header: ({ column }) => <Sort title='Имя' column={column} />
            },
            {
                accessorKey: 'total_amount',
                header: ({ column }) => <Sort title='Общая касса' column={column} />,
                cell: ({ row }) => `${row.original.total_amount} ₽`
            },
            {
                accessorKey: 'without_spend',
                header: ({ column }) => <Sort title='Чистая касса' column={column} />,
                cell: ({ row }) => `${row.original.without_spend} ₽`
            },
            {
                accessorKey: 'payment',
                header: ({ column }) => <Sort title='Зарплата' column={column} />,
                cell: ({ row }) => `${row.original.payment} ₽`
            },
            {
                accessorKey: 'operator_part',
                header: ({ column }) => <Sort title='Касса-эл' column={column} />,
                cell: ({ row }) => `${row.original.operator_part} ₽`
            },
            {
                accessorKey: 'five_percent',
                header: ({ column }) => <Sort title='5%' column={column} />,
                cell: () => '-' // Placeholder as in your current table
            },
            {
                accessorKey: 'result',
                header: ({ column }) => <Sort title='Итог' column={column} />,
                cell: ({ row }) => `${row.original.result} ₽`
            },
            {
                accessorKey: 'branch_name',
                header: ({ column }) => <Sort title='Филиал' column={column} />,
                cell: ({ row }) => row.original.branch_name || '-'
            },
            {
                accessorKey: 'town_name',
                header: ({ column }) => <Sort title='Ветка' column={column} />,
                cell: ({ row }) => row.original.town_name || '-'
            }
        ],
        []
    )
}
