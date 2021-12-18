import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import Home from "./pages/home/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={routes.home} element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
