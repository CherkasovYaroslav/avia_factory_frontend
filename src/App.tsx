import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import { SuppliersList } from './components/supplier/SuppliersList'
import { Menu } from './components/Menu'
import { SupplierInfo } from './components/supplier/SupplierInfo'

export const App = () => {
  

  return (
    <>
    
      <div className="container">
        <Menu/>

        <main className="main">
            <Routes> 
                <Route path="/suppliers" element={<SuppliersList />} />
                <Route path="/suppliers/:id" element={<SupplierInfo />} />
                {/*<Route path="/clients" element={<ClientsList />} /> */} 
            </Routes>
            <section className="content">
                <div className="grid cards">
                    <div className="card">
                        <h3>Активні користувачі</h3>
                        <div className="value"> <span ></span></div>
                        <div className="hint">Оновлено: сьогодні</div>
                    </div>
                    <div className="card">
                        <h3>Онлайн пристрої</h3>
                        <div className="value"><span></span></div>
                    </div>
                    <div className="card">
                        <h3>Сеансів за добу</h3>
                        <div className="value"><span></span></div>
                    </div>
                    <div className="card">
                        <h3>Подій безпеки</h3>
                        <div className="value">5</div>
                        <span className="badge warn">увага</span>
                    </div>
                </div>



                <div className="footer">Статичний прототип інтерфейсу без JavaScript</div>
            </section>
            
        </main>
    </div>
   
    </>
  )
}


