import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <header>
                <h1 className={'font-bold'}>Barking emotions</h1>
            </header>
            <main>
                <p>Record your dog's barking and find out how he feels like</p>
                <div>
                    Recorder
                </div>
            </main>
        </>
    )
}

export default App
