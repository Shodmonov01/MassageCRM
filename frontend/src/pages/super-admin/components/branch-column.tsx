import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { Edit } from 'lucide-react'

import Sort from '@/components/shared/sort'
import { Button } from '@/components/ui/button'

export const getColumns = (handleEdit: (operator: any) => void) => {
    return useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'id',
                header: ({ column }: { column: any }) => {
                    return <Sort title='ID' column={column} />
                }
            },
            {
                accessorKey: 'name',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Имя' column={column} />
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
                header: () => <div className='text-center'>Действия</div>
            }
        ],
        [handleEdit]
    )
}
