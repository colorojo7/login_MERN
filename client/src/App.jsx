import "./App.css";
import AppRouter from "./routers/AppRouter";
import { useUserStore } from "./store/userStore";

function App() {
  const verifyToken = useUserStore((state) => state.veryfyToken);
 
    verifyToken();
    
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
