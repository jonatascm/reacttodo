import React, {useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Digital from 'react-activity/lib/Digital';

import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';

import api from '../../services/api';

import 'react-activity/lib/Digital/Digital.css';
import './styles.css';
import logo from '../../assets/logo-black.png';

export default  function LoginPage() {
  let history = useHistory();
  const [registerModal,setRegisterModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const getLogin = async () => {
      const storeString = await localStorage.getItem('@ReactTodoApi');
      if(storeString){
        const store = await JSON.parse(storeString);
        if(store && store.token){
          history.push("/todo");
        }          
      }
    }
    
    getLogin();
    setLoading(false);
  },[history])

  const toggleModal = () => {
    setRegisterModal(!registerModal);
  }

  const onSubmit = async (data) => {
    try{
      const response = await api.post('/auth/authenticate', data);
      await localStorage.setItem('@ReactTodoApi', JSON.stringify(response.data));
      history.push("/todo");
    }catch(err){
      console.log(err);
    }
  }

  const onSignUp = async (data) => {
    try{
      await api.post('/auth/register', data);
      toggleModal();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
        {loading ?  <Digital size={30} color={"#e64a19"}/> 
        :<div className="app">
          <div className="logo">
            <img src={logo} alt="ReactTodo Logo"/>
          </div>
          <main>
            <LoginForm onSubmit={onSubmit}/>
            <div className="signup">
              <span>
                Don't have an account?&nbsp; 
                <Link className={'linkAccount'}to={''} onClick={toggleModal}>
                  Sign Up
                </Link>
              </span>
            </div>
          </main>
          <Modal
            isOpen={registerModal}
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
            <SignupForm onSubmit={onSignUp} />
          </Modal>
        </div>
        }
    </div>
  );
}

