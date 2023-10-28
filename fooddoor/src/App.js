import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import AllRoutes from './Router/AllRoutes';
import Store from './Store/Store';
function App() {
  return (
   <>
   <Provider store={Store}><AllRoutes/></Provider>
     
   </>
  );
}

export default App;
