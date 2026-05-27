import { BrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout.js";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
