import { useState } from 'react';
import axios from '../api/axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LOGIN_API = '/authenticate';
type Props = {}

export default function Login({}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const userAuth = useAuth();

  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate("/profile");
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await axios.post(LOGIN_API,
      {
        userName: username,
        password: password,
      }
      );
    console.log(response.data.jwt);
    localStorage.setItem('token', response.data.jwt);
    userAuth.setIsAuthenticated(true);
    await new Promise(r => setTimeout(r, 500));
    setSuccess(true);
    
    
  }
  return (
    <div>
    {success ? <>{handleNavigate()}</> : 
    (<div onSubmit={handleSubmit} className='container'>
      <h1 className='text-center mx-auto mt-5'>Вход</h1>
      <Card className='m-5 p-2 w-50 mx-auto'>
      <Form className='m-5'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control 
          type="text" 
          id="username" 
          placeholder="Введи свое имя пользователя"
          onChange={(e) => setUsername(e.target.value)}
          required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Твой пароль"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required />
      </Form.Group>
      <div className='text-center'>
      <Button variant="primary" type="submit" >
        Войти
      </Button>
      <Form.Text className="text-muted">
          <br />Нет аккаунта?<Link to='/register'>Регистрация</Link>
        </Form.Text>
      </div>
    </Form>
    </Card>
    </div>)}
    </div>
  )
}