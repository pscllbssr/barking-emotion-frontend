import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {AudioRecorder} from "./components/AudioRecorder";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className={'flex flex-col h-screen'}>
                <header className={'bg-slate-50 p-4'}>
                    <h1 className={'font-bold max-w-prose mx-auto text-center text-xl'}>🐶 WoofSense</h1>
                </header>
                <main className={'grow p-4'}>
                    <p className={'max-w-[680px] mx-auto px-2 text-lg'}>Haven't you always wanted to understand what your dog is
                        truly expressing? Introducing <b>WoofSense</b> - the ultimate bark decoder! Record, analyze, and
                        unravel the emotions in your pet's barking. Start connecting with your furry friend on a deeper
                        level.</p>
                    <div className={'mx-auto text-center p-4 max-w-[680px]'}>
                        <AudioRecorder/>
                    </div>
                    <div>
                    </div>
                </main>
                <footer className={'bg-slate-700 py-2 px-8'}>
                    <p className={'max-w-[680px] mx-auto text-slate-50 text-sm'}>Lorem ipsum</p>
                </footer>
            </div>
        </>
    )
}

export default App
