import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField,Grid,Stack} from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const baseUrl='http://localhost:8080'; 


function MyOrders() {
  const [productOrders, setProductOrders]=useState([]);
  const [insertModal, setModalInsertar]=useState(false);
  const [editModal, setModalEditar]=useState(false);
  const [deleteModal, setModalEliminar]=useState(false);
const navigate = useNavigate();
  const [productOrder, setProductOrder]=useState({
    code: '',
    date:new Date(),
    totalAmount:0,
    finalPrice: 0.0,
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setProductOrder(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(productOrder);
  }


  const createProductOrder=async()=>{
    const dataAux = await axios.post(baseUrl+'/productOrder', productOrder);
    console.log(dataAux);
      setProductOrders(prevProductOrders=>[...prevProductOrders,dataAux.data])
      toggleInsertProductOrder()
  }

//   const editProductOrder=async()=>{
//     await axios.put(baseUrl+productOrder.id, productOrder)
//     .then(response=>{
//       var dataNueva=productOrders;
//       dataNueva.map(po=>{
//         if(productOrder.id===po.id){
//           po.nombre=productOrder.nombre;
//           po.lanzamiento=productOrder.lanzamiento;
//           po.empresa=productOrder.empresa;
//           po.unidades_vendidas=productOrder.unidades_vendidas;
//         }
//       })
//       setProductOrders(dataNueva);
//       toggleEditProductOrder();
//     })
//   }

  const deleteProductOrder=async()=>{
    await axios.delete(baseUrl+productOrder.id)
    .then(response=>{
      setProductOrders(productOrders.filter(po=>po.id!==productOrder.id));
      toggleDeleteProductOrder();
    })
  }

  const toggleInsertProductOrder=()=>{
    setModalInsertar(!insertModal);
  }

  const toggleEditProductOrder=()=>{
    setModalEditar(!editModal);
  }

  const toggleDeleteProductOrder=()=>{
    setModalEliminar(!deleteModal);
  }

  const selectProductOrder=(po, caso)=>{
    setProductOrder(po);
    (caso==='Edit')?navigate('/add-order'):toggleDeleteProductOrder()
  }

  useEffect(()=>{

    const loadData=async()=>{
        const dataAux = await axios.get(baseUrl+'/productOrder');
        console.log(dataAux.data);
        setProductOrders(dataAux.data);
      }
    
    loadData();
  },[])

  const createBody=(
    <div >
      <h3>Add new Order</h3>
      <TextField name="code"  label="Order #" onChange={handleChange}/>
      <br />
      <TextField name="totalAmount"  label="# Products" onChange={handleChange}/>
      <br />
      <TextField name="finalPrice"  label="Final Price"  onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>createProductOrder()}>Add</Button>
        <Button onClick={()=>toggleInsertProductOrder()}>Cancel</Button>
      </div>
    </div>
  )

  const editBody=(
    <div >
      <h3>Edit Order</h3>
      <TextField name="code"  label="Order #" onChange={handleChange} value={productOrder && productOrder.code}/>
      {/* <br />
      <TextField name="date"  disabled onChange={handleChange} value={new Date()}/>
      <br /> */}
      <br />
      <TextField name="totalAmount"  label="# Products" onChange={handleChange} value={productOrder && productOrder.totalAmount}/>
      <br />
      <TextField name="finalPrice"  label="Final Price" onChange={handleChange} value={productOrder && productOrder.finalPrice}/>
      <br /><br />
      <div align="right">
        <Button color="primary">Edit</Button>
        <Button onClick={()=>toggleEditProductOrder()}>Cancel</Button>
      </div>
    </div>
  )

  const deleteBody=(
    <div >
      <p>Are you sure you want to delete order   <b>{productOrder && productOrder.code}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>deleteProductOrder()} >Yes</Button>
        <Button onClick={()=>toggleDeleteProductOrder()}>No</Button>

      </div>

    </div>
  )


  return (
    <div className="App">
        {"My orders"}
      <br />
      <Grid container justifyContent="flex-end">
    <Button variant="contained" onClick={()=>navigate('/add-order')}>new Order</Button>
    </Grid>
      <br /><br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>ID</TableCell>
             <TableCell>Order #</TableCell>
             <TableCell># Products</TableCell>
             <TableCell>Final Price</TableCell>
             <TableCell>Options</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {productOrders.map(po=>(
             <TableRow key={po.id}>
               <TableCell>{po.id}</TableCell>
               <TableCell>{po.code}</TableCell>
               <TableCell>{po.totalAmount}</TableCell>
               <TableCell>{po.finalPrice}</TableCell>
               <TableCell>
                 <EditIcon  onClick={()=>selectProductOrder(po, 'Edit')}/>
                 &nbsp;&nbsp;&nbsp;
                 <DeleteIcon   onClick={()=>selectProductOrder(po, 'Delete')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={insertModal}
     onClose={toggleInsertProductOrder}>
        {createBody}
     </Modal>

     <Modal
     open={editModal}
     onClose={toggleEditProductOrder}>
        {editBody}
     </Modal>

     <Modal
     open={deleteModal}
     onClose={toggleDeleteProductOrder}>
        {deleteBody}
     </Modal>
    </div>
  );
}

export default MyOrders;
