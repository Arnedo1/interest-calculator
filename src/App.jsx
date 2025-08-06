import React from 'react'
import Header from './components/Header'
import Calculator from './components/Calculator'
import Results from './components/Results'

const App = () => {
  return (
    <div className="app-container">
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <Header />
      <div className='md:flex md:gap-10'>
        <div className='flex-1'>
          <Calculator />
        </div>
        <div className='flex-1'>
          <Results />
        </div>
      </div>
    </div>
    </div>
  )
}

export default App