import { NextResponse } from 'next/server'

export type ThemeId = 'orange' | 'blue' | 'emerald' | 'purple'

export type ThemeDefinition = {
  id: ThemeId
  name: string
  description: string
  // CSS variables are injected on <html data-theme="...">
  variables: Record<string, string>
}

// These themes only change the primary/accent brand colors.
// All other neutrals stay the same so the UI remains readable.
const themes: ThemeDefinition[] = [
  {
    id: 'orange',
    name: 'Smart IS Orange',
    description: 'Current orange primary brand',
    variables: {
      '--primary': '#FF5722',
      '--ring': '#FF5722',
      '--accent': '#FF5722',
    },
  },
  {
    id: 'blue',
    name: 'Navy Blue',
    description: 'More corporate, less loud',
    variables: {
      '--primary': '#2563EB',
      '--ring': '#2563EB',
      '--accent': '#2563EB',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Fresh, modern green',
    variables: {
      '--primary': '#10B981',
      '--ring': '#10B981',
      '--accent': '#10B981',
    },
  },
  {
    id: 'purple',
    name: 'Purple',
    description: 'Premium / bold',
    variables: {
      '--primary': '#7C3AED',
      '--ring': '#7C3AED',
      '--accent': '#7C3AED',
    },
  },
]

export const runtime = 'nodejs'
export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json({ themes })
}
