import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { where } from 'firebase/firestore'

import { useAuth } from '@core/framework/hooks/useAuth'
import { useStore } from '@core/framework/hooks/useStore'
import usersApi from '@core/infra/api/users'
import geteway from '@core/infra/gateway'
import userMemory from '@core/memory/localStorage/userMemory'
import { memoryLocal } from '@core/memory/memoryLocal'
import AppTitle from '@core/presentation/shared/AppTitle'
import { UserCard } from '@core/presentation/shared/UserCard'
import { Button } from '@core/presentation/ui/button'
import { Input } from '@core/presentation/ui/input'
import { Label } from '@core/presentation/ui/label'

export default function UserSettingsPage() {
  const navigate = useNavigate()

  const auth = useAuth()
  const store = useStore()

  const [data, setData] = useState({
    displayName: store.user.displayName!
  })


  useEffect(() => {
    auth.isAuthenticated()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdateData = async () => {
    try {
      const result = await usersApi(geteway).query(
        where('uid', '==', store.user.uid!)
      )

      const [userData] = result

      if (!userData) {
        alert('algo inesperado aconteceu ao tentar novamente mais tarde!')
        return
      }

      const body = {
        id: userData!.id,
        uid: userData!.uid!,
        photoURL: userData!.photoURL!,
        displayName: data!.displayName
      }
      await usersApi(geteway).update(body.id, body)

      store.setData({
        user: body,
      });

      alert('Nome atualizado!')

    } catch (error) {
      console.log('... handleUpdateData error', (error as Error).message);
    }
  }

  const handleDeleteAccount = async () => {
    const confirmEvent = window.confirm("Esta é uma ação irreversível, deseja continuar?")

    if (!confirmEvent) return

    try {
      const result = await usersApi(geteway).query(
        where('uid', '==', store.user.uid!)
      )

      result.map(el => {
        usersApi(geteway).delete(el!.id)
      })

      userMemory(memoryLocal).delete()

      auth.signOut()

      alert('Conta excluída com sucesso, até logo!')

      navigate('/')
    } catch (error) {
      console.log('... handleDeleteAccount error', (error as Error).message);
    }
  }
  return (
    <>
      <AppTitle>Meus dados</AppTitle>

      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-1 items-start">
        <div className='shadow-md p-2'>
          <UserCard.Photo
            photoURL={store.user.photoURL!}
            alt={store.user.displayName!}
            className='mb-2 mx-0' />

          <Label htmlFor='uid'>Uid</Label>
          <Input.Root>
            <Input.Content
              id="uid"
              name="uid"
              disabled
              defaultValue={store.user.uid} />

          </Input.Root>

          <Label htmlFor='displayName'>Nome</Label>
          <Input.Root className='mb-2'>
            <Input.Content
              id="displayName"
              name="displayName"
              value={data.displayName}
              onChange={(e) => setData(prev => ({ ...prev, displayName: e.target.value }))} />
          </Input.Root>

          <Button variant='outline' onClick={handleUpdateData}>Atualizar dados</Button>
        </div>

        <div className='shadow-md p-2'>
          <Label htmlFor='' className='block mb-2'>Conta</Label>

          <Button variant='outline' onClick={handleDeleteAccount}>Excluir minha conta e meus dados</Button>
        </div>
      </div>
    </>
  )
}
