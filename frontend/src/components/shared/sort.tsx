import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import { Button } from '../ui/button'

const Sort = ({ title, column }: { title: string; column: any }) => {
    return (
        <Button
            variant='ghost'
            onClick={() => {
                const currentSortDirection = column.getIsSorted()
                if (currentSortDirection === false) {
                    column.toggleSorting(false)
                } else if (currentSortDirection === 'asc') {
                    column.toggleSorting(true)
                } else {
                    column.clearSorting()
                }
            }}
            className='px-0 font-medium'
        >
            {title}
            {column.getIsSorted() === 'asc' ? (
                <ArrowUp className='ml-1 h-4 w-4' />
            ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className='ml-1 h-4 w-4' />
            ) : (
                <ArrowUpDown className='ml-1 h-4 w-4' />
            )}
        </Button>
    )
}

export default Sort
