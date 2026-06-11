import {Toaster} from "sonner"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import PageLoginSignup from "./pages/pageLoginSignup.jsx"
import PageHome from "./pages/pageHome.jsx"
import { AuthProvider } from "./context/AuthContext.jsx" 
import ProtectedRoute from "./routes/ProtectedRoute.jsx" 
import GuestRoute from "./routes/GuestRoute.jsx" 
import { UIProvider } from "./context/UIContext.jsx"
import PageProject from "./pages/pageProject.jsx"
import PageRAG from "./Pages/PageRAG.jsx"

function App() {
  return (
    <>
    <Toaster richColors/>
    <AuthProvider>
        <BrowserRouter>
            <Routes>
            <Route
                path = "/"
                element = { <GuestRoute>
                            <PageLoginSignup/>
                            </GuestRoute>}/>
            <Route
                path = "/homepage"
                element = {<UIProvider>
                            <ProtectedRoute>
                                <PageHome/>
                                <PageProject/>
                            </ProtectedRoute>
                            </UIProvider>
                        }/>
            <Route
                path = "/homepage/project/:id"
                element = {<UIProvider>
                            <ProtectedRoute>
                                <PageProject/>
                            </ProtectedRoute>
                            </UIProvider>
                        }/>
            <Route
                path = "/project/:id/rag"
                element = {<UIProvider>
                            <ProtectedRoute>
                                <PageRAG/>
                            </ProtectedRoute>
                            </UIProvider>
                        }/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
    </>
  )
}
export default App
