import { Route, Routes } from 'react-router-dom'
import FlaatingShape from './components/FlaatingShape'
import Home from './components/pages/Home'
import SignUp from './components/pages/SignUp'
import LoginPages from './components/pages/LoginPages'
function App() {

  return (
   <div className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-between relative overflow-hidden'>
    <FlaatingShape 
       color='bg-green-500' size="w-64 h-64" top="-5%" letf="10%" delay={0}
    />
    <FlaatingShape 
       color='bg-emerald-600' size="w-48 h-48" top="70%" letf="80%" delay={5}
    /><FlaatingShape 
       color='bg-lime-500' size="w-32 h-32" top="40%" letf="-10%" delay={10}
    />
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/signup" element={<SignUp />} /> 
     <Route path="/login" element={<LoginPages />} />
   </Routes>
   </div>
  )
}

export default App
