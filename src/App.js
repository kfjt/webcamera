import React, {useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const videoEl = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { mediaDevices } = navigator
      const video = videoEl.current
      if (mediaDevices && video !== null) {
        const stream = await mediaDevices.getUserMedia({video: true})
        video.srcObject = stream
        video.play()
      }
    })()
  }, [])
    

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <video ref={videoEl} />
    </div>
  );
}

export default App;
