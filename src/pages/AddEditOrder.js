import React,{useState,useEffect,useParam} from 'react';
import axios from 'axios';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField,Grid,Stack} from '@mui/material/';
const baseUrl='http://localhost:8080'; 

function AddEditOrder() {
    const [productOrders, setProductOrders]=useState([]);
    const [insertModal, setModalInsertar]=useState(false);
    const [editModal, setModalEditar]=useState(false);
    const [deleteModal, setModalEliminar]=useState(false);
  
    const [productOrder, setProductOrder]=useState({
      code: '',
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
      (caso==='Edit')?toggleEditProductOrder():toggleDeleteProductOrder()
    }

    const param=true;
  return (
    <div >
        <h3>
      { param?"Add new Order":"Edit Order"}</h3>
      <TextField name="code"  label="Order #" onChange={handleChange}/>
      <br />
      <TextField name="totalAmount"  label="# Products" onChange={handleChange}/>
      <br />
      <TextField name="finalPrice"  label="Final Price"  onChange={handleChange}/>
      <br /><br />
      <div align="left">
        <Button color="primary" onClick={()=>createProductOrder()}>Add</Button>
        <Button onClick={()=>toggleInsertProductOrder()}>Cancel</Button>
      </div>
    </div>
  );
}

export default AddEditOrder;