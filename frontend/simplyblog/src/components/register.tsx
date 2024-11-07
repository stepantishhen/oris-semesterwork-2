import { useState, useEffect} from 'react'
import { NavLink, Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import axios from '../api/axios';

const REGISTER_API = '/register';
const CHECK_USERNAME_API = '/usernamecheck';
type Props = {}

export default function Register({}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errrormsg, setErrormsg] = useState('');

  useEffect(() => {
    if(username && username.length > 4) {
      console.log("username :"+username);
      const CheckUsername = async () => {
          try {
            const response = await axios.get(CHECK_USERNAME_API+'/'+username);
            // console.log("response:");
            // console.log(response.data);
            if(response.data){
              setErrormsg('Имя пользователя уже существует..');
              setIsError(true);
            } else {
              setErrormsg('Имя пользователя доступно..');
              setIsError(false);
            }
            
          } catch (error:any) {
            setIsError(true);
            setErrormsg('Server Error');
          }
        }
      CheckUsername();
      } else setErrormsg('');
    },[ username ]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if(!isError){
      const response = await axios.post(REGISTER_API, 
        {
        userName: username,
        password: password,
        roles: "ROLE_USER",
        active: true,
        }
      );
      console.log("response:");
      console.log(response.data);
      // setSuccess(true);
    }
    setSuccess(!success)
    console.log('Data Submitted')};
    
  return (
    <div className='container'>
    {success ? (<div className='text-center'><h2>Готово</h2><h3><NavLink to="/login">Перейти к входу</NavLink></h3></div>) :
    (<div>
      <h1 className='text-center mx-auto mt-5'>Зарегистрироваться</h1>
      <div onSubmit={handleSubmit}>
      <Card className='m-5 p-2 w-50 mx-auto'>
      <div className='text-center mx-auto'>
      {(errrormsg && errrormsg==="Имя пользователя доступно..") &&
        (<div className='alert alert-success p-0 mb-0 border-0'>
        <p aria-live="assertive">{errrormsg}</p>
        </div>)}
        {(errrormsg && (errrormsg==="Имя пользователя уже существует.." || errrormsg==="Server Error")) &&
        (<div className='alert alert-danger p-0 mb-0 border-0'>
        <p aria-live="assertive">{errrormsg}</p>
      </div>)}
      </div>
      <Form className='m-5 mt-4'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Имя пользователя (минимум 5 символов)"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e:any) => setUsername(e.target.value)}
          required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Пароль"
          id="password"
          onChange={(e:any) => setPassword(e.target.value)}
          required />
      </Form.Group>
      <div className='text-center'>
      <Button variant="primary" type="submit" disabled={isError} >
        Зарегистрироваться
      </Button>
      <Form.Text className="text-muted">
          <br />Уже есть аккаунт?! Перейти на <Link to='/login'>Вход</Link>
        </Form.Text>
      </div>
    </Form>
    </Card>
    </div>
    </div>)}
    </div>
  )
}