import { describe, it, expect} from 'vitest'
import { useSidebarModel } from './sidebar.model'
import { connectionsAtom } from './sidebar.atoms'
import { renderWithInjectedAtoms } from '@/test/utils/renderWithInjectedAtoms'
import { makeConnection } from '@/test/mock/connections/factory'
import { renderHook, waitFor } from '@testing-library/react'
import { activeConnectionAtom } from '../console.atoms'

describe('<SidebarModel />', () => {
    const initialConnections = [makeConnection(), makeConnection()]

    it('should have initial values on connections atom', () => {
        const { result } = renderWithInjectedAtoms(useSidebarModel, [[connectionsAtom, [initialConnections]]])
        expect(result.current.connections).toHaveLength(1)
    })

    it('should be able to add connection', () => {
        const { result } = renderHook(() => useSidebarModel())
        result.current.handleNewConnection()
        expect(result.current.connections).toHaveLength(1)
    })

    it('should be able to reset connections', async () => {
        const { result } = renderWithInjectedAtoms(useSidebarModel, [[connectionsAtom, [initialConnections]]])
        expect(result.current.connections).toHaveLength(1)
        result.current.handleResetConnections()

        await waitFor(() => {
            expect(result.current.connections).toHaveLength(0)
        })
    })

    it('should be able to select connection', async () => {
        const { result } = renderWithInjectedAtoms(useSidebarModel, [[connectionsAtom, [initialConnections]], [activeConnectionAtom, initialConnections[0]]])
        
        await waitFor(() => {
            expect(result.current.activeConnection?.id).toBe(initialConnections[0].id)
        })
        
        result.current.handleDbClickConnection(initialConnections[1])
        
        await waitFor(() => {
            expect(result.current.activeConnection?.id).toBe(initialConnections[1].id)
        })
    })
})