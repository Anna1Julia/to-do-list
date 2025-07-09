import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import './Theme.css'

export default function Theme() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('tema') === 'escuro'
    })

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode)
        localStorage.setItem('tema', darkMode ? 'escuro' : 'claro')
    }, [darkMode])

    return (
        <button
            className="botao-tema"
            onClick={() => setDarkMode(prev => !prev)}
            title="Alternar tema"
        >
            {darkMode ? <FaSun /> : <FaMoon />}
        </button>
    )
}
