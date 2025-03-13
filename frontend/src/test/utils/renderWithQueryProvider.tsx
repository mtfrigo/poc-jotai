import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { ReactNode } from "react";


const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: ReactNode}) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export const renderWithQueryProvider = (children: ReactNode) => {
    return render(<QueryProvider>{children}</QueryProvider>)
}