import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import Sort from '@/components/shared/sort'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

export const getColumns = (handleEdit: (operator: any) => void) => {
    return useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'id',
                header: ({ column }) => <Sort title='ID' column={column} />
            },
            {
                accessorKey: 'month',
                header: ({ column }) => <Sort title='Дата' column={column} />,
                cell: ({ row }) => {
                    const rawMonth = row.original.month
                    const parsed = dayjs(rawMonth)

                    const formatted = parsed.isValid() ? parsed.format('MMMM YYYY') : '—'

                    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
                }
            },
            {
                accessorKey: 'login',
                header: ({ column }) => <Sort title='Имя' column={column} />
            },
            {
                accessorKey: 'working_hours',
                header: ({ column }) => <Sort title='Время за месяц (часы)' column={column} />
            },
            {
                accessorKey: 'income',
                header: ({ column }) => <Sort title='Зарплата' column={column} />,
                cell: ({ row }) => `${row.original.income} ₽`
            },
            {
                accessorKey: 'status',
                header: ({ column }) => <Sort title='Статус' column={column} />,
                cell: ({ row }) => {
                    const status = row.original.status
                    return status ? 'Не выплачен' : 'Выплачен'
                }
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
