import { describe, it, expect} from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { SidebarView } from './sidebar.view'
import { useSidebarModel } from './sidebar.model'

const MakeSidebar = () => {
    const methods = useSidebarModel()
    return <SidebarView {...methods} />
}

describe('<Sidebar />',  () => {
    it('should be possible to add a connection', () => {
        const screen = render(<MakeSidebar />)

        const connectionlist = screen.getByTestId('connection-list')
        const initialCOnnections = connectionlist.querySelectorAll('button')

        expect(initialCOnnections.length).toBe(0)
        
        const newButton = screen.getByTestId('new-connection-button')
        fireEvent.click(newButton)

        const finalConnections = connectionlist.querySelectorAll('button')

        expect(finalConnections.length).toBe(1)
    })

    it('should be possible to reset connections', () => {
        const screen = render(<MakeSidebar />)

        const connectionlist = screen.getByTestId('connection-list')
        
        const newButton = screen.getByTestId('new-connection-button')
        fireEvent.click(newButton)
        const resetButton = screen.getByTestId('reset-connection-button')
        fireEvent.click(resetButton)

        const finalConnections = connectionlist.querySelectorAll('button')


        expect(finalConnections.length).toBe(0)
    })

    it('should have empty list message on initial render', () => {
        const screen = render(<MakeSidebar />)

        expect(screen.getByText('No connections available')).toBeDefined()
    })
})