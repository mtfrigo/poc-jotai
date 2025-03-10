import { describe, it, expect} from 'vitest'
import { useOraclePanelModel } from './oracle-panel.model'
import { renderWithInjectedAtoms } from '@/test/utils/renderWithInjectedAtoms'
import { makeConnection } from '@/test/mock/connections/factory'
import { makePanel, makeTab } from '@/test/mock/panel/factory'
import { successfulOracleExecutionServiceMock } from '@/test/mock/execution-service'
import { activeConnectionAtom } from '../../console.atoms'
import { panelsAtom } from '../panel.atoms'
import { Panel } from '../../schemas/panel'
import { OracleConsole } from '../../schemas/console'
import { makeOracleConsole } from '@/test/mock/oracle/factory'
import { oracleConsolesAtom } from './oracle-panel.atoms'

describe('<OraclePanelModel />', () => {
    const initialConnection = makeConnection({
        flavor: 'ORACLE'
    })

    const tabs = [makeTab(), makeTab()];
    const activeTab = tabs[0].id
    const initialPanel = makePanel({ tabs, activeTab })

    const initialPanels: Record<string, Panel> = {
        [initialConnection.id]: {
            ...initialPanel
        }
    }

    const initialConsole = makeOracleConsole();

    const initialConsoles: Record<string, OracleConsole> = {
        [activeTab]: {
            ...initialConsole
        }
    }

    it('should have initial values on panel', () => {
        const { result } = renderWithInjectedAtoms(() => useOraclePanelModel({
            consoleId: activeTab,
            executionService: successfulOracleExecutionServiceMock
        }), [
            [activeConnectionAtom, initialConnection],
            [panelsAtom, initialPanels],
            [oracleConsolesAtom, initialConsoles]
        ])


        expect(result.current.statement).toBe(initialConsole.statement)
    })


})