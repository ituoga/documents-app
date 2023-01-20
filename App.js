import Navigation from "./components/navigation/Navigation";
import AuthContextProvider, { AuthContext } from './store/auth-context';

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
export default App
