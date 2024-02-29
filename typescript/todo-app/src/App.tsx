// App.tsx
import { useMyContext } from "./components/MyContext";
import Header from "./components/Header/Header";
import CreateModal from "./components/CreateModal";

function App() {
  const { data } = useMyContext();
  return (
    <div className="bg-neutral-800  w-full relative text-lg h-screen">
      {data && <CreateModal />}
      <Header />
    </div>
  );
}

export default App;
