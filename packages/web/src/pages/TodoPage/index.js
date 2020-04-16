import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import {useHistory} from "react-router-dom";
import Digital from 'react-activity/lib/Digital';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrashAlt, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import {
  Table,
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead,
  TableRow,
  Checkbox,
  Paper } from '@material-ui/core';

import TodoForm from '../../components/TodoForm';

import 'react-activity/lib/Digital/Digital.css';
import './styles.css';
import logo from '../../assets/logo-black.png';

import api from '../../services/api';

export default function TodoPage() {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoModal, setTodoModal] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(()=>{
    fetchTodo();
    setLoading(false);
  }, []);

  const fetchTodo = async () => {
    try{
      const response = await api.get('/todo/getAll');
      setTodos(response.data.todos);
    }catch(err){
      console.log(err);
    }
  }

  const onSave = async (data) => {
    try{
      const response = await api.post('/todo/', data);
      toggleModal();
      setTodos([...todos, response.data.todo]);
    }catch(err){
      console.log(err);
    }
  }

  const onDelete = async (id) => {
    try{
      await api.delete(`/todo/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    }catch(err){
      console.log(err);
    }
  }

  const handleDone = async (id) => {
    try{
      const newTodos = todos.map(item => {
        if(item._id === id)
          item.isDone = !item.isDone;
        return item;
      });
      await api.post(`/todo/done/${id}`);
      setTodos(newTodos);
    }catch(err){
      console.log(err);
    }
  }

  const toggleModal = () => {
    setTodoModal(!todoModal);
  }

  const openAddModal = () => {
    setTitle('Create Todo')
    toggleModal();
  }

  const onSignout = async (data) => {
    try{
      await localStorage.setItem('@ReactTodoApi', '');
      history.push("/");
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="app">
      <div className="logo">
        <img src={logo} alt="ReactTodo Logo"/>
      </div>
      {loading 
      ? <Digital className="loadingContainer" size={30} color={"#e64a19"}/> 
      : <div className="listContainer">
          <div className="todoContainer">
            <button className="addButton" onClick={openAddModal}>
              <FontAwesomeIcon icon={faPlusCircle} className="plusIcon"/>
              ADD
            </button>
            <button className="signoutButton" onClick={onSignout}>
              <FontAwesomeIcon icon={faDoorOpen} className="plusIcon"/>
              SIGN OUT
            </button>
          </div>
          <div className="todoList">
            <TableContainer component={Paper}>
              <Table className={"table"} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell  style={{ width: 50 }} align="center">Done</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell style={{ width: 50 }} align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todos.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row" align="left">
                        <Checkbox
                          checked={row.isDone}
                          onChange={()=> handleDone(row._id)}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        <FontAwesomeIcon 
                          className="trashIcon" 
                          onClick={()=>onDelete(row._id)} 
                          icon={faTrashAlt}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      }
      <Modal
        isOpen={todoModal}
        onRequestClose={toggleModal}
        style={{
          content : {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%'
          }
        }}
        ariaHideApp={false}
      >
        <TodoForm onSubmit={onSave} title={title} type={"create"}/>
      </Modal>
    </div>
  );
}
