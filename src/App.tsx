import "./App.scss";
import Test from "./Test";
import TestCommunication from "./TestCommunication";
import WindowLayerProvider from "./WindowLayerProvider";
import WindowsCommunicationServiceProvider from "./windows-communication/WindowsCommunicationServiceProvider";
function App() {
  return (
    <div className="App">
      <WindowsCommunicationServiceProvider>
        <WindowLayerProvider>
          <TestCommunication />
        </WindowLayerProvider>
      </WindowsCommunicationServiceProvider>
    </div>
  );
}

export default App;
