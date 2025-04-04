import { flexRender } from '@tanstack/react-table'

import { Loader2 } from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function CommonTable({ table, columns, isLoading }: { table: any; columns: any; isLoading: boolean }) {
    if (isLoading)
        return (
            <div className='flex justify-center p-8'>
                <Loader2 />
            </div>
        )

    return (
        <Table className='border-collapse [&_th]:border [&_td]:border mt-6'>
            <TableHeader className='!bg-[#f1f1f1]'>
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
                        <TableRow key={row.id}>
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
    )
}
