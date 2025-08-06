import React from 'react'
import Header from './components/Header'
import Calculator from './components/Calculator'  // Fixed the typo here
import Results from './components/Results'

const App = () => {
  return (
    <div className="w-[1200px] flex mx-auto">
      <div>
      <Header/>
      <div className='flex gap-10'>
        <div>
<Calculator/>
        </div>
        <div>
<Results/>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default App