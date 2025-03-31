import { format } from 'date-fns'

import { CalendarIcon, X } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

interface TypeProps {
    startDate: Date | undefined
    setStartDate: (date: Date | undefined) => void
    endDate: Date | undefined
    setEndDate: (date: Date | undefined) => void
}

const FilterDate: React.FC<TypeProps> = ({ startDate, setStartDate, endDate, setEndDate }) => {
    return (
        <div>
            <div className='flex items-center gap-2'>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline'
                            className={`w-[180px] justify-start text-left font-normal ${
                                !startDate && 'text-muted-foreground'
                            }`}
                        >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {startDate ? format(startDate, 'dd.MM.yyyy') : 'Начальная дата'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                        <Calendar mode='single' selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                </Popover>
                <span className='text-muted-foreground'>по</span>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline'
                            className={`w-[180px] justify-start text-left font-normal ${
                                !endDate && 'text-muted-foreground'
                            }}`}
                        >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {endDate ? format(endDate, 'dd.MM.yyyy') : 'Конечная дата'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                        <Calendar mode='single' selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default FilterDate
