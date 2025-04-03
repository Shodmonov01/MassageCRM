import { format } from 'date-fns'

import { CalendarIcon, X } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

interface TypeProps {
    startDate: string
    setStartDate: (date: string) => void
    endDate: string
    setEndDate: (date: string) => void
}

const FilterTime: React.FC<TypeProps> = ({ startDate, setStartDate, endDate, setEndDate }) => {
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
                            <input
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                type='time'
                                className='w-full focus:outline-none focus:bg-inherit bg-inherit'
                            />
                        </Button>
                    </PopoverTrigger>
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
                            <input
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                type='time'
                                className='w-full focus:outline-none focus:bg-inherit bg-inherit'
                            />
                        </Button>
                    </PopoverTrigger>
                    {/* <PopoverContent className='w-auto p-0'>
                        <Calendar mode='single' selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent> */}
                </Popover>
            </div>
        </div>
    )
}

export default FilterTime
