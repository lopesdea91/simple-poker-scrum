import React from 'react'
import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { signInWithGoogle, signOutWithGoogle } from 'src/@core/framework/lib/firebase'
import { useAppStore } from 'src/@core/framework/store/appStore'
import { geteway } from 'src/@core/infra/gateway'
import { useMemory } from 'src/@core/infra/memory'
import { memoryLocal } from 'src/@core/infra/memory/memoryLocal'
import { GetUserByUIDService } from 'src/@core/services/GetUserByUIDService'
import { CreateUserService } from 'src/@core/services/CreateUserService'
import { UserProviderParseData } from 'src/@core/utils/userProviderParseData'
import { MakeUserOnlineService } from 'src/@core/services/MakeUserOnlineService'
import { MakeUserOfflineService } from 'src/@core/services/MakeUserOfflineService'

export const Header = () => {
  const appStore = useAppStore()

  return (
    <header className='mb-3 md:mb-5 mx-3'>
      <div className='p-2 mx-auto w-full max-w-screen-md border-b-[1px] shadow-sm flex items-center justify-between'>
        <button
          className='text-xs text-sky-900 font-bold m-0 p-0 leading-0 hover:opacity-75'
          onClick={() => appStore.setView('principal')}
        >
          SIMPLE-POKER
        </button>

        <Profile />
      </div>
    </header>
  )
}

const Profile = () => {
  const appStore = useAppStore()
  const memory = useMemory(memoryLocal)

  const handleClickAccount = () => {
    alert('em breve!')
  }

  const handleSignIn = async () => {
    try {
      const { user: userGoogle } = await signInWithGoogle();

      const userProviderData = UserProviderParseData(userGoogle)

      let currentUser = await GetUserByUIDService(geteway)(userProviderData.uid)

      if (!!currentUser) {
        await MakeUserOnlineService(geteway)(currentUser.uid)
      }

      if (!currentUser) {
        currentUser = await CreateUserService(geteway)(userProviderData!)
      }

      memory.create(currentUser!)

      appStore.setAuth(currentUser!)

    } catch (error) {
      console.log(error)
    }
  }
  const handleSignOut = async () => {
    try {
      await signOutWithGoogle()

      await MakeUserOfflineService(geteway)(appStore.auth!.uid)

      memory.delete()

      appStore.setAuth(null)

    } catch (error) {
      console.log(error)
    }
  }


  if (appStore.auth?.id) {
    return (
      <div
        data-animate="animate-content"
        className='flex items-center gap-1 text-xs'
      >
        <span className=''>Olá</span>

        <button
          onClick={handleClickAccount}
          disabled={appStore.loading}
          title='Minha conta'
          className='hover:opacity-75 duration-150'
        >
          {appStore.auth.displayName}
        </button>

        <button
          onClick={handleSignOut}
          className='w-8 h-6 flex [&_*]:m-auto text-lg text-gray-600 hover:opacity-75 duration-150'
          disabled={appStore.loading}
          title='Sair'
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    )
  }

  return (
    <button
      data-animate="animate-content"
      onClick={handleSignIn}
      className='w-8 h-6 flex [&_*]:m-auto text-lg text-gray-600 hover:opacity-75 duration-150'
      disabled={appStore.loading}
      title='Entrar'
    >
      <FontAwesomeIcon icon={faRightToBracket} />
    </button>
  )
}