import { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import useAuthStore from "./store/authStore";
import Spinner from "./components/Spinner";

function App() {

  const refresh_auth = useAuthStore((state) => state.refresh_auth);
  const [isLoading, setIsLoading] = useState(true)

  
  const veryfyUser = async ()=>{
    await refresh_auth();
    setIsLoading(false)
  }
  useEffect(()=>{
    veryfyUser()
  },[])


  
  return (
    <>
      {isLoading? 
      <div className="h-full flex justify-center items-center">
        <Spinner/>
      </div>
      :
      <AppRouter />
      }
    </>
  );
}

export default App;
