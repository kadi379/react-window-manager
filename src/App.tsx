import "./App.scss"
import Test from "./Test"
import WindowLayerProvider from "./WindowLayerProvider"
function App() {
    return (
        <div className="App">
            <WindowLayerProvider>
                <Test />
            </WindowLayerProvider>
        </div>
    )
}

export default App
