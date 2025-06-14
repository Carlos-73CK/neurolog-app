'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// --- CORRECCIÓN 1: Añadir 'id' a las propiedades ---
interface DatePickerWithRangeProps {
  id?: string; // Hacemos que el id sea opcional
  className?: string;
  date?: DateRange;
  onDateChange: (date: DateRange | undefined) => void; // Renombrado para claridad
}

export function DatePickerWithRange({
  id, // --- CORRECCIÓN 2: Recibir el id ---
  className,
  date,
  onDateChange, // Renombrado para claridad
}: DatePickerWithRangeProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            // --- CORRECCIÓN 3: Pasar el id al botón ---
            id={id} 
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd LLL y', { locale: es })} -{' '}
                  {format(date.to, 'dd LLL y', { locale: es })}
                </>
              ) : (
                format(date.from, 'dd LLL y', { locale: es })
              )
            ) : (
              <span>Seleccionar fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange} // Usamos el nuevo nombre
            numberOfMonths={2}
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
