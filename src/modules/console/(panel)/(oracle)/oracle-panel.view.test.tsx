import { describe, it, expect} from 'vitest'
import {  render } from '@testing-library/react'
import { OraclePanelView } from './oracle-panel.view'
import { useOraclePanelModel } from './oracle-panel.model'

import { successfulOracleExecutionServiceMock } from '@/test/mock/execution-service'

const MakeOraclePanel = () => {
    const consoleId = 'salve'

    const methods = useOraclePanelModel({
        consoleId,
        executionService: successfulOracleExecutionServiceMock
    })
    return <OraclePanelView {...methods} />
}

describe('<OraclePanelView />',  () => {
    it('should show console idle', () => {
        const screen = render(<MakeOraclePanel />)

        const message = screen.getByText('No execution')
        expect(message).toBeDefined()
    })
})