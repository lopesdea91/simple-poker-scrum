import React, { FC } from 'react'

import { useAppStore } from 'src/@core/framework/store/appStore'

import { RoomsCreated } from './_components/RoomsCreated'
import { Rooms } from './_components/Rooms'
import { Users } from './_components/Users'

export const PrincipalView: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const appStore = useAppStore()

  return (
    <>
      <pre>
        {JSON.stringify(appStore.auth, null, 2)}
      </pre>

      <div className='md:h-full md:flex md:gap-2' {...props}>
        <div className='md:overflow-y-auto md:flex-[2.5]'>
          <RoomsCreated />
          <Rooms />
        </div>

        <div className='md:overflow-y-auto hidden md:block border-l-[1px] pl-2 md:flex-1'>
          <Users users={appStore.principal.users} />
        </div>
      </div>
    </>
  )
}
