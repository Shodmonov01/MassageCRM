import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Edit } from 'lucide-react'

import Sort from '@/components/shared/sort'
import { Button } from '@/components/ui/button'

export const getColumns = () => {
    return useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'id',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Дата' column={column} />
                }
            },
            {
                accessorKey: 'category',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Категория' column={column} />
                }
            },
            {
                accessorKey: 'category',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Расход или приход' column={column} />
                }
            },
            {
                accessorKey: 'cost',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Итог' column={column} />
                }
            },
            {
                accessorKey: 'description',
                header: ({ column }: { column: any }) => {
                    return <Sort title='Комментарий' column={column} />
                }
            }
        ],
        []
    )
}
