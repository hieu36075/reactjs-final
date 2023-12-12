import Body from './layout/body/Body'
import './App.css'

import ToastNotification from './components/toast/ToastNotification';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    // <BrowserRouter>
    <div className="App bg-primary1">
        <div className='body'>
          <ToastNotification/>
              <Body/>       
        </div>

    </div>
  );
}

export default App;
