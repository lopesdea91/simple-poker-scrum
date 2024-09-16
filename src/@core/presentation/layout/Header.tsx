import React from 'react'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { signInWithGoogle } from 'src/@core/framework/lib/firebase'
import { useAppStore } from 'src/@core/framework/store/appStore'
import { geteway } from 'src/@core/infra/gateway'
import { useMemory } from 'src/@core/infra/memory'
import { memoryLocal } from 'src/@core/infra/memory/memoryLocal'
import { GetUserByUIDService } from 'src/@core/services/GetUserByUIDService'
import { CreateUserService } from 'src/@core/services/CreateUserService'
import { UserProviderParseData } from 'src/@core/utils/userProviderParseData'

export const Header = () => {
  return (
    <header className='mb-3 md:mb-5 mx-3'>
      <div className='p-2 mx-auto w-full max-w-screen-md border-b-[1px] shadow-sm flex items-center justify-between'>
        <h1 className='text-xs text-sky-900 font-bold m-0 p-0 leading-0'>SIMPLE-POKER</h1>

        <Profile />
      </div>
    </header>
  )
}

const Profile = () => {
  const appStore = useAppStore()
  const memory = useMemory(memoryLocal)

  const handleSignIn = async () => {
    try {
      const { user: userGoogle } = await signInWithGoogle();

      const userProviderData = UserProviderParseData(userGoogle)

      let currentUser = await GetUserByUIDService(geteway)(userProviderData.uid)

      if (!currentUser) {
        currentUser = await CreateUserService(geteway)(userProviderData!)
      }

      memory.create(currentUser!)

      appStore.setAuth(currentUser!)

    } catch (error) {
      console.log(error)
    }
  }

  const handleSignOut = () => { }


  if (appStore.auth?.id) {
    return (
      <div>LOGADO</div>
    )
  }

  return (
    <button
      onClick={handleSignIn}
      className='w-8 h-6 flex [&_*]:m-auto text-lg text-gray-600 hover:text-gray-800 duration-150'
      disabled={appStore.loading}
    >
      <FontAwesomeIcon icon={faRightToBracket} className='' />
    </button>
  )
}