import './App.css';
import {Routes, Route} from 'react-router-dom'

import MyOrders from './pages/MyOrders';
import AddEditOrder from './pages/AddEditOrder';

function App() {
  return (
    <Routes>
        <Route path="/" element={<MyOrders></MyOrders>}></Route>
        <Route path="/my-orders" element={<MyOrders></MyOrders>}></Route>
        <Route path="/add-order" element={<AddEditOrder></AddEditOrder>}></Route>
   
    </Routes>
  );
}

export default App;
