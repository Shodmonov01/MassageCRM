import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import Sort from '@/components/shared/sort'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

export const getColumns = (handleEdit: (operator: any) => void) => {
    return useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'admin_id',
                header: ({ column }) => <Sort title='ID' column={column} />
            },
            {
                accessorKey: 'admin_name',
                header: ({ column }) => <Sort title='Дата' column={column} />
            },
            {
                accessorKey: 'branch_name',
                header: ({ column }) => <Sort title='Имя' column={column} />
            },
            {
                accessorKey: 'total_working_hours',
                header: ({ column }) => <Sort title='Время за месяц (часы)' column={column} />
            },
            {
                accessorKey: 'income',
                header: ({ column }) => <Sort title='Зарплата' column={column} />,
                cell: ({ row }) => `${row.original.income} ₽`
            },
            {
                accessorKey: 'salary',
                header: ({ column }) => <Sort title='Статус' column={column} />
            },
            {
                id: 'actions',
                header: 'Действия',
                cell: ({ row }) => (
                    <div className='text-center'>
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => handleEdit(row.original)}
                            className='h-8 w-8'
                        >
                            <Edit className='h-4 w-4' />
                            <span className='sr-only'>Редактировать</span>
                        </Button>
                    </div>
                )
            }
        ],
        [handleEdit]
    )
}
