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
import { EmployeesList } from './components/employee/EmployeesList'
import { EmployeeInfo } from './components/employee/EmployeeInfo'
import { PlanesList } from './components/plane/PlaneList'
import { PlaneInfo } from './components/plane/PlaneInfo'
import { ProductsList } from './components/product/ProductsList'
import { ProductInfo } from './components/product/ProductInfo'
import { OrdersList } from './components/order/OrdersList'
import { OrderInfo } from './components/order/OrderInfo'
import { SupplierSections } from './components/supplier/SupplierSections'
import { SectionSuppliers } from './components/section/SectionSuppliers'

export const App = () => {
  

  return (
    <>
      <div className="container">
        <Menu/>

        <main className="main">
          <Routes> 
            <Route path="/" element={<DashboardContent />} />
            <Route path="/suppliers" element={<SuppliersList />} />
           <Route path="/suppliers/:id/sections" element={<SupplierSections />} />
            <Route path="/suppliers/:id" element={<SupplierInfo />} />

            <Route path="/clients" element={<ClientsList />} />
            <Route path="/clients/:id" element={<ClientInfo />} />
                
            <Route path="/sections" element={<SectionsList />} />
            <Route path="/sections/:id/suppliers" element={<SectionSuppliers />} />
            <Route path="/sections/:id" element={<SectionInfo />} />

            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/employees/:id" element={<EmployeeInfo />} />

            <Route path="/planes" element={<PlanesList />} />
            <Route path="/planes/:id" element={<PlaneInfo />} />

            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductInfo />} />

            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/:id" element={<OrderInfo />} />

          </Routes>
        </main>
      </div>
    </>
  )

}


