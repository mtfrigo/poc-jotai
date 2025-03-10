import { describe, it, expect} from 'vitest'
import { usePanelModel } from './panel.model'
import { renderWithInjectedAtoms } from '@/test/utils/renderWithInjectedAtoms'
import { makeConnection } from '@/test/mock/connections/factory'
import { activeConnectionAtom } from '../console.atoms'
import { makePanel, makeTab } from '@/test/mock/panel/factory'
import { Panel } from '../schemas/panel'
import { panelsAtom } from './panel.atoms'
import { waitFor } from '@testing-library/react'
import { act } from 'react'

describe('<PanelModel />', () => {
    const initialConnection = makeConnection()

    const tabs = [makeTab(), makeTab()];
    const initialPanel = makePanel({ tabs, activeTab: tabs[0].id})

    const initialPanels: Record<string, Panel> = {
        [initialConnection.id]: {
            ...initialPanel
        }
    }

    it('should have initial values on panel', () => {
        const { result } = renderWithInjectedAtoms(usePanelModel, [
            [activeConnectionAtom, initialConnection],
            [panelsAtom, initialPanels]
        ])

        expect(result.current.panel?.tabs).toHaveLength(tabs.length)
    })

    it('should be able to select tab', async () => {
        const { result } = renderWithInjectedAtoms(usePanelModel, [
            [activeConnectionAtom, initialConnection],
            [panelsAtom, initialPanels]
        ])

        expect(result.current.panel?.tabs).toHaveLength(tabs.length)
        act(() => {
            result.current.handleSelectTab(tabs[1].id)
        })
        await waitFor(() => {
            expect(result.current.panel?.activeTab).toBe(tabs[1].id)
        })
    })

    it('should be able to reset tabs', async () => {
        const { result } = renderWithInjectedAtoms(usePanelModel, [
            [activeConnectionAtom, initialConnection],
            [panelsAtom, initialPanels]
        ])

        expect(result.current.panel?.tabs).toHaveLength(tabs.length)
        act(() => {
            result.current.handleResetTabs()
        })
        await waitFor(() => {
            expect(result.current.panel?.tabs).toHaveLength(0)

        })
    })

    it('should be able to add tabs', async () => {
        const { result } = renderWithInjectedAtoms(usePanelModel, [
            [activeConnectionAtom, initialConnection],
            [panelsAtom, initialPanels]
        ])

        expect(result.current.panel?.tabs).toHaveLength(tabs.length)
        act(() => {
            result.current.handleAddTab()
        })
        await waitFor(() => {
            expect(result.current.panel?.tabs).toHaveLength(tabs.length  + 1)
        })
    })

})