'use client'

import {
    Gift,
    Home,
    Info,
    LayoutGrid,
    Package,
    Users,
    Wrench,
} from 'lucide-react'
import type { ComponentType } from 'react'

export type NavItem = {
  label: string
  href: string
  icon: ComponentType<{ className?: string; size?: number }>
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Menu', href: '/menu', icon: LayoutGrid },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Services', href: '/services', icon: Wrench },
  { label: 'Team', href: '/team', icon: Users },
  { label: 'Giveaway', href: '/giveaway', icon: Gift },
]
