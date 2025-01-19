import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './component/ChatPage';
import JoinRoom from './component/JoinRoom';
import Createroom from './component/Createroom';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Route to join the room */}
          <Route path='' element={<Createroom />} />
         
          {/* Route to chat page */}
          <Route path='/chat/:username' element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
