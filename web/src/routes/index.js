import { Routes, Route } from "react-router-dom";
// import Join from "../components/join";
import Chat from "../components/chat";
import Chatit from "../pages/chat";
import Home from "../pages/home";

function App() {
  return (
    <div className="Routes">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/" element={<Chat />} /> */}
        {/* <Route path="/" exact element={<Join />} />  */}
        <Route path="/" exact element={<Chatit />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/chat/:user_nickName" exact element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
