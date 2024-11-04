import { ReactNode } from 'react'

export type Role = 'admin' | 'manager' | 'valet'

export type BaseComponent = {
    children?: ReactNode
    className?: String
}

export type MenuItem = { label: string; href: string }