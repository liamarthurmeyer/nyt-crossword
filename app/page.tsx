'use client';

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DayPickerSkeleton } from "./DayPickerSkeleton";
import Image from 'next/image';
import { DayPicker } from 'react-day-picker';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Checkbox } from "@/components/ui/checkbox"

export default function Home() {
  // const [date, setDate] = useState<Date | undefined>(new Date());
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  const { theme, toggleTheme } = useTheme();

  const [lastSelectedDate, setLastSelectedDate] = useState<Date | null>(null); // Store the last selected date

  const [weekStartsMonday, setWeekStartsMonday] = useState(false);

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      // Load completed dates
      const storedDates = JSON.parse(localStorage.getItem('completedDates') || '[]');
      setCompletedDates(storedDates);

      // Load week start preference
      const storedWeekStart = localStorage.getItem('weekStartsMonday');
      setWeekStartsMonday(storedWeekStart === 'true');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dontShowAgain = localStorage.getItem('dontShowAgain') === 'true';
      const hasSeenWelcomeThisSession = sessionStorage.getItem('hasSeenWelcome') === 'true';

      if (!dontShowAgain && !hasSeenWelcomeThisSession) {
        setShowWelcome(true);
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }
    }
  }, []); // Only runs on mount

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0].replace(/-/g, '/');

      // Save to localStorage
      const updatedDates = [...completedDates];
      if (!updatedDates.includes(formattedDate)) {
        updatedDates.push(formattedDate);
        localStorage.setItem('completedDates', JSON.stringify(updatedDates));
        setCompletedDates(updatedDates);
      }

      // Navigate to the URL in new tab
      const url = `https://www.nytimes.com/crosswords/game/mini/${formattedDate}`;
      window.open(url, "_blank");
      setLastSelectedDate(selectedDate);
    }
  };

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
      // Saturday: Special handling for Sunday's puzzle
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

  const handleWeekStartChange = (value: boolean) => {
    setWeekStartsMonday(value);
    localStorage.setItem('weekStartsMonday', value.toString());
  };

  const handleDontShowAgain = () => {
    localStorage.setItem('dontShowAgain', 'true');
    setShowWelcome(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center pt-8 gap-2">

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Settings</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>
              Configure your preferences.
            </SheetDescription>
            <div className="flex items-center space-x-4">
              <span>Dark Mode</span>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
            <div className="flex items-center space-x-4">
              <span>Week Starts on Monday</span>
              <Switch
                checked={weekStartsMonday}
                onCheckedChange={handleWeekStartChange}
                className="data-[state=unchecked]:dark:bg-gray-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              {/* Export Button */}
              <Button
                onClick={() => {
                  const data = JSON.stringify(completedDates);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'nyt-mini-progress.json';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
              >
                Export Completed Dates
              </Button>

              {/* Import Button */}
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  id="importFile"
                  className="hidden"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const importedDates = JSON.parse(event.target?.result as string);
                          if (Array.isArray(importedDates)) {
                            setCompletedDates(importedDates);
                            localStorage.setItem('completedDates', JSON.stringify(importedDates));

                            // Show success dialog
                            document.getElementById('successTrigger')?.click();
                          } else {
                            // Show error dialog for invalid format
                            document.getElementById('errorTrigger')?.click();
                          }
                        } catch (error) {
                          // Show error dialog for parsing error
                          document.getElementById('errorTrigger')?.click();
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
                <Button
                  onClick={() => document.getElementById('importFile')?.click()}
                >
                  Import Completed Dates
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="flex flex-col gap-2">
                    <Button variant="destructive">Clear Completed Dates</Button>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will clear your completed dates. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        localStorage.removeItem('completedDates');
                        setCompletedDates([]);
                      }}
                    >
                      Clear Dates
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {/* Today's Mini Button */}
      <div className="relative flex flex-col items-center gap-2">
        <button
          className="pointer-events-auto flex flex-col items-center gap-2 p-4 bg-transparent border-none cursor-pointer"
          onClick={goToToday}
        >
          <h1 className="text-xl font-bold mb-2">Today&apos;s Mini</h1>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
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
            <h1 className="mb-2 text-xl font-semibold">Find the Mini For a Specific Day</h1>
            <DayPickerSkeleton />
          </div>
        ) : (
          <div className="relative flex flex-col items-center w-full h-full">
            <h1 className="mb-2 text-xl font-semibold">Find the Mini For a Specific Day</h1>
            <DayPicker
              mode="single"
              // selected={date}
              onSelect={handleDateSelect}
              disabled={{
                before: new Date(2014, 7, 21),
                after: getLatestAvailablePuzzle(),
              }}
              startMonth={new Date(2014, 7, 21)}
              endMonth={getLatestAvailablePuzzle()}
              fixedWeeks={true}
              captionLayout="dropdown"
              weekStartsOn={weekStartsMonday ? 1 : 0}
              className="rounded-md border bg-white p-3 dark:bg-gray-800 dark:border-gray-600"
              modifiers={{
                completed: completedDates.map((date) => {
                  const [year, month, day] = date.split('/').map(Number);
                  return new Date(year, month - 1, day); // Month is 0-indexed in Date
                }),
                lastSelected: lastSelectedDate ? [lastSelectedDate] : [],
              }}
              modifiersClassNames={{
                completed: 'bg-green-200 text-green-800 rounded-full dark:bg-green-700 dark:text-white',
                lastSelected: '!bg-blue-200 !text-blue-800 rounded-full dark:bg-blue-700 dark:text-white',
                today: '!text-blue-600 dark:!text-cyan-400',
              }}
            />
          </div>
        )}
      </div>

      {/* Random Puzzle Button */}
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-14"
          onClick={getRandomUncompletedDate}
        >
          Go to a Random Uncompleted Puzzle
        </button>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog>
        <AlertDialogTrigger id="successTrigger" className="hidden" />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Success!</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress has been imported successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Alert Dialog */}
      <AlertDialog>
        <AlertDialogTrigger id="errorTrigger" className="hidden" />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>
              There was an error importing your progress. Please make sure you&apos;re using a valid export file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showWelcome} onOpenChange={setShowWelcome}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome to the New York Times Mini Archive!</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>
                This tool helps you access past NYT Mini Crosswords without a subscription.
              </p>
              <p>
                Features:
                <br />
                • Click any date to open that day&apos;s puzzle
                <br />
                • Tracks completed puzzles automatically
                <br />
                • Export your progress to use across devices
                <br />
                • Dark mode and other customization options
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dontShowAgain"
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleDontShowAgain();
                    }
                  }}
                />
                <label htmlFor="dontShowAgain">Don&apos;t show this message again</label>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Get Started</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </main >
  );
}
