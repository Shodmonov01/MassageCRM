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
                accessorKey: 'result',
                header: ({ column }) => <Sort title='Общая касса' column={column} />,
                cell: ({ row }) => `${row.original.result} ₽`
            },
            {
                accessorKey: 'without_spend',
                header: ({ column }) => <Sort title='Чистая касса' column={column} />,
                cell: ({ row }) => `${row.original.without_spend} ₽`
            },
            {
                accessorKey: 'operator_part',
                header: ({ column }) => <Sort title='Зарплата' column={column} />,
                cell: ({ row }) => `${row.original.operator_part} ₽`
            },
            {
                accessorKey: 'total_amount',
                header: ({ column }) => <Sort title='Касса-зп' column={column} />,
                cell: ({ row }) => `${row.original.total_amount} ₽`
            },
            {
                accessorKey: 'role',
                header: ({ column }) => <Sort title='5%' column={column} />
            },
            {
                accessorKey: 'total_amount',
                header: ({ column }) => <Sort title='Итог' column={column} />,
                cell: ({ row }) => `${row.original.total_amount} ₽`
            }
        ],
        []
    )
}
