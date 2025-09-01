"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(props.month ?? new Date())
  const [direction, setDirection] = React.useState<"left" | "right">("right")

  const handleMonthChange = (newMonth: Date) => {
    if (newMonth > month) setDirection("right")
    else setDirection("left")
    setMonth(newMonth)
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-xl sm:rounded-2xl border bg-background shadow-lg p-3 sm:p-4 md:p-6 overflow-hidden mx-auto">
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={month.toISOString()}
          custom={direction}
          initial={{ x: direction === "right" ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction === "right" ? -100 : 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <DayPicker
            month={month}
            onMonthChange={handleMonthChange}
            showOutsideDays={showOutsideDays}
            fixedWeeks
            className={cn("w-full", className)}
            classNames={{
              months: "flex flex-col items-center",
              month: "space-y-3 sm:space-y-4 w-full",
              caption:
                "flex items-center justify-between w-full border-b pb-2 mb-2 sm:mb-3",
              caption_label:
                "text-base sm:text-lg font-semibold tracking-wide text-foreground text-center flex-1",
              nav: "flex items-center space-x-1 sm:space-x-2",
              nav_button: cn(
                buttonVariants({ variant: "ghost" }),
                "h-7 w-7 sm:h-8 sm:w-8 rounded-full p-0 transition hover:bg-accent hover:text-accent-foreground"
              ),
              table: "w-full border-collapse",
              head_row: "flex justify-between",
              head_cell:
                "text-muted-foreground font-medium text-xs uppercase tracking-wide text-center w-7 sm:w-8 md:w-10",
              row: "flex w-full justify-between mt-1 sm:mt-2",
              cell: "relative h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-center text-sm p-0",
              day: cn(
                buttonVariants({ variant: "ghost" }),
                "h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full p-0 font-normal text-xs sm:text-sm transition hover:bg-accent hover:text-accent-foreground"
              ),
              day_today:
                "font-semibold border border-primary text-primary rounded-full",
              day_selected:
                "bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary focus:bg-primary",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-30",
              day_range_middle:
                "aria-selected:bg-accent aria-selected:text-accent-foreground rounded-full",
              day_hidden: "invisible",
              ...classNames,
            }}
            components={{
              IconLeft: ({ className, ...props }) => (
                <ChevronLeft className={cn("h-4 w-4 sm:h-5 sm:w-5", className)} {...props} />
              ),
              IconRight: ({ className, ...props }) => (
                <ChevronRight className={cn("h-4 w-4 sm:h-5 sm:w-5", className)} {...props} />
              ),
            }}
            {...props}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }