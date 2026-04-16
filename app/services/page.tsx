'use client'

import ServicesScreen from '@/components/ServicesScreen'
import { useRouter } from 'next/navigation'

export default function ServicesPage() {
  const router = useRouter()
  return <ServicesScreen onBack={() => router.push('/menu')} />
}
