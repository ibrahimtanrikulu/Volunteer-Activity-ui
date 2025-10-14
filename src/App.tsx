import { Outlet } from "react-router-dom";



export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50"> 
      <main className="flex-1 max-w-6xl mx-auto w-full p-6">
        <Outlet />
      </main> 
    </div>
  );
}