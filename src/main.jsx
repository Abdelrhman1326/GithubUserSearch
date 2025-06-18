import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.jsx';
import { SearchProvider } from "./Context/SearchContext";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <SearchProvider>
                <App />
            </SearchProvider>
        </QueryClientProvider>
    </StrictMode>
);