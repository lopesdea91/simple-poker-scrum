import dayjs from "dayjs";
import React, { ReactNode } from "react";
import { cn } from "src/@core/framework/lib/utils";

export const UserBabe = {
  Root: ({ className, ...props }: { children: ReactNode, className?: string }) => {
    return (
      <div
        // data-animate="animate-content"
        className={cn(
          "flex items-center gap-2 shadow p-2 mb-2 relative",
          className
        )}
        {...props}
      />
    )
  },
  Figure: ({ className, ...props }: { children: ReactNode, title?: string, className?: string }) => (
    <div
      className={cn(className, "border-[2px] w-[32px] h-[32px] rounded-full overflow-hidden flex [&_*]:m-auto")}
      {...props}
    />
  ),
  lastLogin: ({ updated_at }: { updated_at: number }) => (
    <span
      className='absolute -top-0.5 right-0.5 text-xs'
      title={'Último login ' + dayjs(updated_at).format('DD/MM/YYYY')}
    >
      {dayjs(updated_at).format('DD/MM')}
    </span>
  ),
  status: () => {
    return (
      <span className={cn('absolute top-2 right-2 block w-2 h-2 rounded-full bg-green-400')} />
    )
  },
}