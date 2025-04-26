import { flexRender } from '@tanstack/react-table'

import { Loader2 } from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Button } from '@/components/ui/button'

export default function CommonTable({ table, columns, isLoading }: { table: any; columns: any; isLoading: boolean }) {
    if (isLoading)
        return (
            <div className='flex justify-center p-8'>
                <Loader2 />
            </div>
        )

    const currentPage = table.getState().pagination.pageIndex + 1
    const pageCount = table.getPageCount()

    return (
        <div className='mt-6 relative space-y-4'>
            <Table className='border-collapse [&_th]:border [&_td]:border mt-6 relative'>
                <TableHeader className='!bg-[#f1f1f1] !sticky !top-0 z-50 '>
                    {table.getHeaderGroups().map((headerGroup: any) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header: any) => (
                                <TableHead key={header.id} className={header.id === 'actions' ? 'w-[100px]' : ''}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row: any) => (
                            <TableRow
                                key={row.id}
                                className={` ${
                                    row.original.is_cancelled === false && 'bg-[#38FF56] hover:!bg-[#38FF56]'
                                } `}
                            >
                                {row.getVisibleCells().map((cell: any) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className='h-24 text-center'>
                                Нет результатов.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className='flex items-center justify-end gap-2'>
                <div className='flex items-center justify-center gap-2'>
                    {Array.from({ length: pageCount }).map((_, index) => {
                        const page = index + 1
                        return (
                            <Button
                                key={page}
                                variant={page === currentPage ? 'default' : 'outline'}
                                size='sm'
                                onClick={() => table.setPageIndex(index)}
                            >
                                {page}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
