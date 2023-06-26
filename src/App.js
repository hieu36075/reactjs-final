import './App.css';
import Navbar from './layout/navbar/navbar';
import Body from './layout/navbar/body/Body';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <div className='body'>
              <Body/>
        </div>
    </div>
  );
}

export default App;
