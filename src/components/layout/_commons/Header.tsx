import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from 'lib/utils'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function Header({ className, ...props }: HeaderProps) {
  const userName = 'NOME USUÁRIO'

  return (
    <div {...props} className={cn(className, 'app-container h-16 my-3 flex items-center rounded shadow-sm shadow-gray-300')}>
      <div className="flex items-center gap-3 mr-auto">
        <img
          className='block w-10 h-10 rounded-full border-[2px] border-gray-600 shadow-md'
          src="https://lh3.googleusercontent.com/ogw/AF2bZyhpmKMKWDKEZTlPXr2MwPac_DtIA_9hiQ25UjG9WqkUVUM=s64-c-mo"
          title={userName}
          alt={userName}
        />
        <span
          className='inline-block text-xs font-thin uppercase leading-5'
          title={`${userName} é seu nome mesmo?`}
        >
          {userName}
        </span>
      </div>

      <Link
        className='cursor-pointer rounded py-1 px-2 text-white text-sm bg-gray-600 duration-300 hover:opacity-65 shadow-md'
        to='/'
      >
        Início
      </Link>
    </div>
  )
}
