'use client'

import MainMenu from '@/components/MainMenu'
import { useRouter } from 'next/navigation'

export default function MenuPage() {
  const router = useRouter()

  return (
    <MainMenu
      onBack={() => router.push('/')}
      onSelectCategory={(category) => {
        switch (category) {
          case 'products':
            router.push('/products')
            break
          case 'services':
            router.push('/services')
            break
          case 'team':
            router.push('/team')
            break
          case 'giveaway':
            router.push('/giveaway')
            break
          default:
            router.push('/')
        }
      }}
    />
  )
}
