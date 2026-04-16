'use client'

import GiveawayScreen from '@/components/GiveawayScreen'
import { useRouter } from 'next/navigation'

export default function GiveawayPage() {
  const router = useRouter()
  return <GiveawayScreen onBack={() => router.push('/menu')} />
}
