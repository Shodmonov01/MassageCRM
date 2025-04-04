import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { Edit } from 'lucide-react'

import { TypeOperator } from '@/type/type'

import Sort from '@/components/shared/sort'
import { Button } from '@/components/ui/button'

export const getColumns = (handleEdit: (operator: TypeOperator) => void) => {
    return useMemo<ColumnDef<TypeOperator>[]>(
        () => [
            {
                accessorKey: 'id',
                header: ({ column }: { column: any }) => {
                    return <Sort title='ID' column={column} />
                },
                cell: ({ row }: { row: any }) => <div className='w-[80px]'>{row.getValue('id')}</div>
            },
            {
                accessorKey: 'login',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Имя' column={column} />
                }
            },
            {
                accessorKey: 'result',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Общая касса' column={column} />
                }
            },
            {
                accessorKey: 'without_spend',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Чистая касса' column={column} />
                }
            },
            {
                accessorKey: 'operator_part',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Зарплата' column={column} />
                }
            },
            {
                accessorKey: 'total_amount',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Касса-зп' column={column} />
                }
            },
            {
                accessorKey: 'role',
                header: ({ column }: { column: any }) => {
                    return <Sort title='5%' column={column} />
                }
            },
            {
                accessorKey: 'total_amount',
                id: 'итог',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Итог' column={column} />
                }
            },
            {
                id: 'actions',
                cell: ({ row }: { row: any }) => {
                    const operator = row.original
                    return (
                        <div className='text-center'>
                            <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => handleEdit(operator)}
                                className='h-8 w-8'
                            >
                                <Edit className='h-4 w-4' />
                                <span className='sr-only'>Редактировать</span>
                            </Button>
                        </div>
                    )
                },
                header: () => <div className='text-center w-[100px]'>Действия</div>
            }
        ],
        [handleEdit]
    )
}
