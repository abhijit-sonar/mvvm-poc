import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PatientsListScreen from "./features/patient/screens/patients-list/PatientsListScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const router = (
  <BrowserRouter>
    <Routes>
      <Route index Component={PatientsListScreen}></Route>
    </Routes>
  </BrowserRouter>
);

function App() {
  return <Providers>{router}</Providers>;
}

export default App;
