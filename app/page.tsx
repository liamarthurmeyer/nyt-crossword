'use client';

import { Skeleton } from "@/components/ui/skeleton"
import { DayPickerSkeleton } from "./DayPickerSkeleton";
import Image from 'next/image';
import { DayPicker } from 'react-day-picker';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  // const [inputDate, setInputDate] = useState<string>(''); // For the date input field

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Load completed dates from localStorage on mount
    const storedDates = JSON.parse(localStorage.getItem('completedDates') || '[]');
    setCompletedDates(storedDates);
    setDate(undefined);
    setLoading(false);
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Format the selected date
      const formattedDate = selectedDate.toISOString().split('T')[0].replace(/-/g, '/');

      // Save to localStorage
      const updatedDates = [...completedDates];
      if (!updatedDates.includes(formattedDate)) {
        updatedDates.push(formattedDate);
        localStorage.setItem('completedDates', JSON.stringify(updatedDates));
        setCompletedDates(updatedDates);
      }

      // Navigate to the URL
      const url = `https://www.nytimes.com/crosswords/game/mini/${formattedDate}`;
      window.open(url, '_blank');
    }

    // Update state
    setDate(selectedDate);
  };

  // Convert completedDates to an array of Date objects
  const completedDatesAsDates = completedDates.map((date) => {
    const [year, month, day] = date.split('/').map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed in Date
  });

  const goToToday = () => {
    const latestPuzzleDate = getLatestAvailablePuzzle(); // Dynamically calculate the latest available puzzle
    handleDateSelect(latestPuzzleDate); // Navigate to the puzzle for that date
  };

  const getRandomUncompletedDate = () => {
    // Generate all possible dates between August 21, 2014, and today
    const startDate = new Date(2014, 7, 21); // August 21, 2014
    const endDate = new Date();
    const allDates = [];

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '/');
      allDates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    // Filter out completed dates
    const uncompletedDates = allDates.filter((date) => !completedDates.includes(date));

    if (uncompletedDates.length === 0) {
      alert('You have completed all available puzzles!');
      return;
    }

    // Select a random date
    const randomDate = uncompletedDates[Math.floor(Math.random() * uncompletedDates.length)];

    // Convert randomDate back to Date object
    const [year, month, day] = randomDate.split('/').map(Number);
    const randomDateObject = new Date(year, month - 1, day);

    // Navigate to the random puzzle
    handleDateSelect(randomDateObject);
  };

  // const handleDateInputSubmit = () => {
  //   if (inputDate) {
  //     const [year, month, day] = inputDate.split('-').map(Number);
  //     const selectedDate = new Date(year, month - 1, day);

  //     // Validate date range
  //     const startDate = new Date(2014, 7, 21); // August 21, 2014
  //     const endDate = new Date();
  //     if (selectedDate < startDate || selectedDate > endDate) {
  //       alert('Please enter a date between August 21, 2014, and today.');
  //       return;
  //     }

  //     handleDateSelect(selectedDate); // Redirect to the puzzle of the entered date
  //   }
  // };

  // Helper to get the current EST date and time
  const getESTDateTime = (): Date => {
    return new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    );
  };

  const getLatestAvailablePuzzle = (): Date => {
    const estNow = getESTDateTime();
    const dayOfWeek = estNow.getDay(); // 0 = Sunday, ..., 6 = Saturday

    // Default to today's date (normalized to midnight)
    let latestPuzzleDate = new Date(estNow);
    latestPuzzleDate.setHours(0, 0, 0, 0);

    if (dayOfWeek === 6) {
      // Saturday: Special handling for Sunday’s puzzle
      const saturday6PM = new Date(estNow);
      saturday6PM.setHours(18, 0, 0, 0); // 6 PM EST on Saturday

      if (estNow >= saturday6PM) {
        // After 6 PM Saturday, use Sunday's puzzle
        latestPuzzleDate.setDate(latestPuzzleDate.getDate() + 1); // Move to Sunday
      }
    } else {
      // All other days: Check for 10 PM EST release time
      const tenPMToday = new Date(estNow);
      tenPMToday.setHours(22, 0, 0, 0); // 10 PM EST

      if (estNow >= tenPMToday) {
        // After 10 PM, use tomorrow's puzzle
        latestPuzzleDate.setDate(latestPuzzleDate.getDate() + 1);
      }
    }

    return latestPuzzleDate;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      {/* Today's Mini Button */}
      <div className="relative flex flex-col items-center gap-2">
        <button
          className="pointer-events-auto flex flex-col items-center gap-2 p-8 bg-transparent border-none cursor-pointer"
          onClick={goToToday}
        >
          <h1 className="text-xl font-bold">Today's Mini</h1>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/mini_logo.png"
            alt="Link to today's mini"
            width={100}
            height={100}
            priority
          />
        </button>
      </div>

      {/* DayPicker */}
      <div className="relative flex flex-col items-center w-[340px] h-[420px]">
        {loading ? (
          <div className="relative flex flex-col items-center w-full h-full">
            <h1 className="mb-4 text-xl font-semibold">Find the Mini For a Specific Day</h1>
            <DayPickerSkeleton />
          </div>
        ) : (
          <div className="relative flex flex-col items-center w-full h-full">
            <h1 className="mb-4 text-xl font-semibold">Find the Mini For a Specific Day</h1>
            <DayPicker
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={{
                before: new Date(2014, 7, 21),
                after: getLatestAvailablePuzzle(),
              }}
              startMonth={new Date(2014, 7, 21)}
              endMonth={getLatestAvailablePuzzle()}
              fixedWeeks={true}
              captionLayout="dropdown"
              className="rounded-md border bg-white p-3"
              modifiers={{
                completed: completedDatesAsDates,
              }}
              modifiersClassNames={{
                completed: 'bg-green-200 text-green-800 rounded-full',
              }}
            />
          </div>
        )}
      </div>



      {/* Random Puzzle Button */}
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={getRandomUncompletedDate}
        >
          Go to a Random Uncompleted Puzzle
        </button>
      </div>

      {
        /*
        <div className="mt-6 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Navigate to a Specific Puzzle</h2>
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="border rounded-md p-2"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]} // Restrict future dates
              min="2014-08-21" // Restrict dates before the first crossword
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={handleDateInputSubmit}
            >
              Go
            </button>
          </div>
        </div>
        */
      }

    </main >
  );
}
