import Body from './layout/body/Body'
import './App.css'
import AlertPopup from './components/aleart/AlertPopup';

function App() {
  return (
    // <BrowserRouter>

    <div className="App bg-primary1">
        <div className='body'>
          <AlertPopup/>
              <Body/>       
        </div>      
    </div>
  );
}

export default App;
