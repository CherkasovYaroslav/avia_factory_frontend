import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { SuppliersList } from './components/supplier/SuppliersList'
import { Menu } from './components/Menu'
import { SupplierInfo } from './components/supplier/SupplierInfo'
import { DashboardContent } from './components/DashboardContent'
import { ClientsList } from './components/client/ClientsList'
import { ClientInfo } from './components/client/ClientInfo'
import { SectionsList } from './components/section/SectionsList'
import { SectionInfo } from './components/section/SectionInfo'

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

            <Route path="/clients" element={<ClientsList />} />
            <Route path="/clients/:id" element={<ClientInfo />} />
                
            <Route path="/sections" element={<SectionsList />} />
            <Route path="/sections/:id" element={<SectionInfo />} />
          </Routes>
        </main>
      </div>
    </>
  )

}


