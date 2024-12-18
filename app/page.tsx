'use client'

import Image from 'next/image'
import { DayPicker } from "react-day-picker"
import { useState } from 'react'

export default function Home() {

  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      
      const formattedDate = selectedDate.toISOString().split('T')[0].replace(/-/g, '/');

      const url = `https://www.nytimes.com/crosswords/game/mini/${formattedDate}`;
      window.open(url, '_blank');
    }

    setDate(selectedDate);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <a
          className="pointer-events-none flex flex-col items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://www.nytimes.com/crosswords/game/mini"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>Today's Mini</h1>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/mini_logo.png"
            alt="Link to today's mini"
            width={100}
            height={100}
            priority
          />
        </a>
      </div>

      <DayPicker
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        disabled={{ 
          before: new Date(2014, 7, 21),
          after: new Date()
        }}
        startMonth={new Date(2014, 7, 21)}
        endMonth={new Date()}
        fixedWeeks={true}
        captionLayout="dropdown"
        className="rounded-md border bg-white p-3"
      />
    </main>
  )
}
