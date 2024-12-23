import { cn } from "@/lib/utils"

function DayPickerSkeleton({ className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        className={cn(
          "w-[330px] h-[370px] p-4 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse",
          className
        )}
      >
        {/* Header with Month and Year */}
        <div className="flex items-center gap-4 mb-6">
          {/* Month Dropdown Placeholder */}
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          {/* Year Dropdown Placeholder */}
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
  
        {/* Weekday Row */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div
              key={idx}
              className="h-4 w-8 mx-auto bg-gray-300 dark:bg-gray-600 rounded-md"
            />
          ))}
        </div>
  
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 42 }).map((_, idx) => (
            <div
              key={idx}
              className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }
  
  export { DayPickerSkeleton };
  
