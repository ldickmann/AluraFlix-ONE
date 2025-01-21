import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageBase from "./pages/PageBase";
import Home from "./pages/Home";
import NewMovie from "./pages/NewMovie";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageBase />}>
          <Route index element={<Home />} />
          <Route path="NovoVideo" element={<NewMovie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
