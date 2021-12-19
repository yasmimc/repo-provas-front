import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import Home from "./pages/home/Home";
import { GlobalProvider } from "./contexts/globalContext";

function App() {
    return (
        <BrowserRouter>
            <GlobalProvider>
                <Routes>
                    <Route exact path={routes.home} element={<Home />} />
                </Routes>
            </GlobalProvider>
        </BrowserRouter>
    );
}

export default App;
