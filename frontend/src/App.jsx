import { Routes, Route } from 'react-router'
import ProductManagement from './pages/AddProduct'
import BillingHome from './pages/HomePage'
import Layout from './Layout'
import HistoryPage from './pages/HistoryPage'
import InsightsPage from './pages/InsightsPage'

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
      <Route path="/" element={<BillingHome />}/>
      <Route path="/add-product" element={<ProductManagement />}/>
      <Route path="/history" element={<HistoryPage />}/>
      <Route path="/insights" element={<InsightsPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
