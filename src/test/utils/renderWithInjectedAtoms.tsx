import { useHydrateAtoms } from 'jotai/utils'
import { Provider } from 'jotai'
import { renderHook } from "@testing-library/react";
import { ReactNode } from 'react';

const HydrateAtoms = ({initialValues, children}: { initialValues: any, children: ReactNode}) => {
    useHydrateAtoms(initialValues)
    return children
}

const TestProvider = ({ initialValues, children}: { initialValues: unknown, children: ReactNode}) => {
    return (
        <Provider>
            <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
        </Provider>
    )
}

export const renderWithInjectedAtoms = <T,>(hook: () => T, initialValues: unknown) => {
    return renderHook(() => hook(), {
        wrapper: ({children}: { children: ReactNode }) =>  <TestProvider initialValues={initialValues}>{children}</TestProvider>
    })

}