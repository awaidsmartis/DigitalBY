'use client'

import AboutScreen from '@/components/AboutScreen'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const router = useRouter()
  return (
    <AboutScreen
      onBack={() => router.push('/menu')}
      onGoProducts={() => router.push('/products')}
      onGoServices={() => router.push('/services')}
      onGoTeam={() => router.push('/team')}
      onGoGiveaway={() => router.push('/giveaway')}
    />
  )
}
