import { describe, it, expect} from 'vitest'
import {  render } from '@testing-library/react'
import { PanelView } from './panel.view'
import { usePanelModel } from './panel.model'
import { makeConnection } from '@/test/mock/connections/factory'
import { renderWithInjectedAtoms } from '@/test/utils/renderWithInjectedAtoms'
import { activeConnectionAtom } from '../console.atoms'
import { Panel } from '../schemas/panel'
import {   panelsAtom } from './panel.atoms'
import { Flavor } from '../schemas/flavor'
import { makePanel, makeTab } from '@/test/mock/panel/factory'

const MakePanel = () => {
    const methods = usePanelModel()
    return <PanelView {...methods} />
}

describe('<Panel />',  () => {
    it('should show message when no connection selected', () => {
        const screen = render(<MakePanel />)

        const message = screen.getByText('No connection')
        expect(message).toBeDefined()
    })

    it('should show message when no console selected', () => {
        const initialConnection = makeConnection({
            flavor: 'ORACLE'
        })

        const { result } = renderWithInjectedAtoms(usePanelModel, [[activeConnectionAtom, initialConnection]])

        const panel = render(<PanelView {...result.current} />)

        const message = panel.getByText('No Console selected')
        expect(message).toBeDefined()
    })

    

    it('should show unknown message for unknown flavor', () => {
        const initialConnection = makeConnection({
            flavor: 'UNKOWN' as Flavor,
        })

        const tab = makeTab();
        const initialPanel = makePanel({ tabs: [tab], activeTab: tab.id})

        const initialPanels: Record<string, Panel> = {
            [initialConnection.id]: {
                ...initialPanel
            }
        }

        const { result } = renderWithInjectedAtoms(usePanelModel, [
            [activeConnectionAtom, initialConnection],
            [panelsAtom, initialPanels],
        ])

        const panel = render(<PanelView {...result.current} />)

        const message = panel.getByText('Unknown flavor')
        expect(message).toBeDefined()
    })

    it('should show tabs trigger', () => {
        const initialConnection = makeConnection({
            flavor: 'ORACLE',
        })

        const tabs = [makeTab(), makeTab()];
        const initialPanel = makePanel({ tabs, activeTab: tabs[0].id})
        const initialPanels: Record<string, Panel> = {
            [initialConnection.id]: {
                ...initialPanel
            }
        }

        const { result } = renderWithInjectedAtoms(usePanelModel, [
            [activeConnectionAtom, initialConnection],
            [panelsAtom, initialPanels],
        ])

        const panel = render(<PanelView {...result.current} />)

        expect(panel.getAllByTestId('panel-tab-trigger')).toHaveLength(tabs.length)
    })

    describe("Flavor panel", () => {
        it('should show oracle console', () => {
            const initialConnection = makeConnection({
                flavor: 'ORACLE',
            })
    
            const tab = makeTab();
            const initialPanel = makePanel({ tabs: [tab], activeTab: tab.id})
            const initialPanels: Record<string, Panel> = {
                [initialConnection.id]: {
                    ...initialPanel
                }
            }
    
            const { result } = renderWithInjectedAtoms(usePanelModel, [
                [activeConnectionAtom, initialConnection],
                [panelsAtom, initialPanels],
            ])
    
            const panel = render(<PanelView {...result.current} />)
    
            const message = panel.getByTestId('oracle-console')
            expect(message).toBeDefined()
        })

        it('should show mongo console', () => {
            const initialConnection = makeConnection({
                flavor: 'MONGO',
            })
    
            const tab = makeTab();
            const initialPanel = makePanel({ tabs: [tab], activeTab: tab.id})
            const initialPanels: Record<string, Panel> = {
                [initialConnection.id]: {
                    ...initialPanel
                }
            }
    
            const { result } = renderWithInjectedAtoms(usePanelModel, [
                [activeConnectionAtom, initialConnection],
                [panelsAtom, initialPanels],
            ])
    
            const panel = render(<PanelView {...result.current} />)
    
            const message = panel.getByTestId('mongo-console')
            expect(message).toBeDefined()
        })
    })

    
})