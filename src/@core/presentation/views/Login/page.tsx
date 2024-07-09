import userMemory from '@core/memory/localStorage/userMemory'
import { memoryLocal } from '@core/memory/memoryLocal'

import ButtonContinueWithUser from './_components/ButtonContinueWithUser'
import ButtonProviderGoogle from './_components/ButtonProviderGoogle'

export default function LoginPage() {
  const hasLocalUserData = userMemory(memoryLocal).has()
  
  return (
    <div className='lg:border-[1px] border-gray-100 lg:shadow-lg rounded-md w-full max-w-sm flex flex-col items-center p-5 gap-3'>

      <div className='font-thin flex gap-2 mb-2'>
        <h1 className='text-2xl lg:text-3xl'>Simple Poker Scrum</h1>
        <span>(beta)</span>
      </div>

      {hasLocalUserData && <ButtonContinueWithUser />}

      <ButtonProviderGoogle />
    </div>
  )
}

