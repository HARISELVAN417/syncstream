import { BrowserRouter, Routes, Route } from "react-router-dom";
import Host from "./Host";
import Join from "./Join";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Host />} />
        <Route path="/join/:roomId" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;