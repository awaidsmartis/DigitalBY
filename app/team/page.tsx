'use client'

import TeamScreen from '@/components/TeamScreen'
import { useRouter } from 'next/navigation'

export default function TeamPage() {
  const router = useRouter()
  return <TeamScreen onBack={() => router.push('/menu')} />
}
