import { describe, it, expect} from 'vitest'
import { OraclePanelView } from './oracle-panel.view'
import { useOraclePanelModel } from './oracle-panel.model'

import { successfulOracleExecutionServiceMock } from '@/test/mock/api/execution/execution.service'
import { successfulLogCreateServiceMock } from '@/test/mock/api/logs/logs.service'
import { renderWithQueryProvider } from '@/test/utils/renderWithQueryProvider'

const MakeOraclePanel = () => {
    const consoleId = 'salve'

    const methods = useOraclePanelModel({
        consoleId,
        executionService: successfulOracleExecutionServiceMock,
        createLogService: successfulLogCreateServiceMock
    })
    return <OraclePanelView {...methods} />
}

describe('<OraclePanelView />',  () => {
    it('should show console idle', () => {
        const screen = renderWithQueryProvider(<MakeOraclePanel />)

        const message = screen.getByText('No execution')
        expect(message).toBeDefined()
    })
})