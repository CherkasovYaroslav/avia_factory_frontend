import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { SuppliersList } from './components/supplier/SuppliersList'
import { Menu } from './components/Menu'
import { SupplierInfo } from './components/supplier/SupplierInfo'
import { DashboardContent } from './components/DashboardContent'

export const App = () => {
  

  return (
    <>
      <div className="container">
        <Menu/>

        <main className="main">
          <Routes> 
            <Route path="/" element={<DashboardContent />} />
            <Route path="/suppliers" element={<SuppliersList />} />
            <Route path="/suppliers/:id" element={<SupplierInfo />} />
                {/*<Route path="/clients" element={<ClientsList />} /> */} 
          </Routes>
        </main>
      </div>
    </>
  )

}


