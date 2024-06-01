import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "../src/pages/Signup";
import { Signin } from "../src//pages/Signin";
import { Blog } from "../src//pages/Blog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
