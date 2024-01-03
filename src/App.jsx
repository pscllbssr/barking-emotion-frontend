import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className={'flex flex-col h-screen'}>
                <header className={'bg-slate-50 p-4'}>
                    <h1 className={'font-bold max-w-prose mx-auto text-center'}>Barking emotions</h1>
                </header>
                <main className={'grow p-4'}>
                    <p className={'max-w-prose mx-auto px-2'}>Record your dog's barking and find out how he feels like</p>
                    <div className={'mx-auto text-center p-4'}>
                        <button className={'bg-red-100 p-2 rounded shadow-sm'}>
                            <span className={'inline-block rounded-lg bg-red-500 w-3 h-3 mx-1'}></span>
                            Record
                        </button>
                    </div>
                </main>
                <footer className={'bg-slate-700 py-2 px-2'}>
                    <p className={'max-w-prose mx-auto text-slate-50 text-sm'}>Lorem ipsum</p>
                </footer>
            </div>
        </>
    )
}

export default App
