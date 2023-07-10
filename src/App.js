import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "./Components/SharedLayout";
import Post from "./Components/Post/Post";
import Cards from "./Components/Cards/Cards";
import Error from "./Components/Error/Error";

function App() {
  const [admin, setAdmin] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/blog" />} />
      <Route path="/blog" element={<SharedLayout />}>
        <Route index element={<Cards admin={admin} />} />
        <Route path=":postId" element={<Post />} />
        <Route path="create" element={<Post create={true}/>} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
