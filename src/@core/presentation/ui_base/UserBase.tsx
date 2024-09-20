import dayjs from "dayjs";
import React, { ReactNode } from "react";
import { cn } from "src/@core/framework/lib/utils";

export const UserBabe = {
  Root: (props: { children: ReactNode }) => (
    <div
      data-animate="animate-content"
      className="flex items-center gap-2 shadow p-2 mb-2 relative"
      {...props}
    />
  ),
  Figure: ({ className, ...props }: { children: ReactNode, title?: string, className?: string }) => (
    <div
      className={cn(className, "border-[2px] w-[32px] h-[32px] rounded-full overflow-hidden flex [&_*]:m-auto")}
      {...props}
    />
  ),
  lastLogin: ({ updated_at }: { updated_at: number }) => (
    <span
      className='absolute top-0.5 right-0.5 text-xs text-gray-600 opacity-50'
      title={'Último login ' + dayjs(updated_at * 1000).format('DD/MM/YYYY')}
    >
      {dayjs(updated_at * 1000).format('DD/MM')}
    </span>
  )
}