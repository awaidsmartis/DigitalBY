'use client'

import WelcomeScreen from '@/components/WelcomeScreen'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return <WelcomeScreen onExplore={() => router.push('/about')} />
}
