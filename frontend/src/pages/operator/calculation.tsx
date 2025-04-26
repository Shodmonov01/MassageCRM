import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import api from '@/api/Api'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Calculation() {
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([])
    const [selectedTherapist, setSelectedTherapist] = useState('')
    const [hoursWorked, setHoursWorked] = useState('')
    const [clientsServed, setClientsServed] = useState('')
    const [amountEarned, setAmountEarned] = useState('')
    const [reports, setReports] = useState<any | null>(null)
    const [worker, setWorker] = useState([])

    const { data: therapists } = useQuery(['therapists'], async () => {
        const response = await api.get(`/worker`)
        return response.data
    })

    useEffect(() => {
        async function fetchWorker() {
            try {
                const response = await api.get(`/worker/result/${selectedTherapist}`)
                setWorker(response.data)
            } catch (error) {
                console.error('Error fetching worker:', error)
            }
        }

        if (selectedTherapist) {
            fetchWorker()
        }
    }, [selectedTherapist])

    console.log('worker', worker)
    console.log('selectedTherapist', selectedTherapist)

    const handleReport = async () => {
        try {
            await api.post('/worker/result', {
                admin_id: reports.admin_id,
                worker_id: selectedTherapist,
                town_id: reports.town_id,
                offer_id: reports.offer_id,
                operator_id: reports.operator_id,
                cost: reports.cost,
                percent_worker: Number(hoursWorked),
                description: clientsServed
            })
            setReports(null)
            setSelectedTherapist('')
            setHoursWorked('')
            setClientsServed('')
            setAmountEarned('')
        } catch (error) {
            console.log('error', error)
        }
    }

    const handleCost = (w: any) => {
        setAmountEarned(w.cost)
        setReports(w)
    }

    return (
        <div className='w-full'>
            <div className='grid gap-6 md:grid-cols-4 mt-6'>
                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Мастер</label>
                    <Select value={selectedTherapist} onValueChange={setSelectedTherapist}>
                        <SelectTrigger>
                            <SelectValue placeholder='Мастер' />
                        </SelectTrigger>
                        <SelectContent>
                            {therapists?.map((therapist: any) => (
                                <SelectItem key={therapist.id} value={therapist.id}>
                                    {therapist.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Доход</label>

                    <Select
                        value={amountEarned}
                        onValueChange={value => {
                            const selectedWorker = worker?.find((w: any) => w.cost === value)
                            if (selectedWorker) {
                                handleCost(selectedWorker)
                            }
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder='Доход' />
                        </SelectTrigger>
                        <SelectContent>
                            {worker?.map((w: any) => (
                                <SelectItem key={w.id} value={w.cost}>
                                    {w.cost}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Процент</label>
                    <Input
                        className='bg-white'
                        type='number'
                        value={hoursWorked}
                        onChange={e => setHoursWorked(e.target.value)}
                        placeholder='0'
                    />
                </div>

                <div className='space-y-2'>
                    <label className='text-sm font-medium'>Коментарий</label>
                    <Input
                        className='bg-white'
                        type='string'
                        value={clientsServed}
                        onChange={e => setClientsServed(e.target.value)}
                        placeholder='коментарий'
                    />
                </div>
            </div>

            <Button
                onClick={handleReport}
                className='mt-6'
                disabled={!selectedTherapist || !hoursWorked || !clientsServed || !amountEarned}
            >
                Сохранить отчёт
            </Button>
        </div>
    )
}
