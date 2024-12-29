// Css
import "./css/Login.css"

// Tools
import Swal from 'sweetalert2';

// UseCases
import ApiService from '../useCases/fetchUseCase';
import { useNavigate } from "react-router-dom";

//Url
const url = process.env.REACT_APP_API_URL

const Login = () => {

  sessionStorage.setItem('x-t', '');
  sessionStorage.setItem('x-t-e', '');
  sessionStorage.setItem('uuid', '');

  //Navegador
  const navigate = useNavigate();

  const HandleLogin = () => {

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
        Swal.fire({
          title: 'Erro!',
          text: 'Email inválido',
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
        return
    }
    if (!isPasswordValid) {
        Swal.fire({
          title: 'Erro!',
          text: 'Senha inválida',
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
        return
    }

    const api = new ApiService(url)

    api.post('/api/auth/login', {email: email, password: password})
      .then(response => {

        // Failed
        if(!response.success){
          Swal.fire({
            title: 'Erro!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Fechar'
          });
          return
        }

        // Success
        sessionStorage.setItem('x-t', response.token);
        sessionStorage.setItem('x-t-e', response.expire_in);
        sessionStorage.setItem('uuid', response.uuid);
        
        Swal.fire({
          title: 'Sucess',
          text: 'Login realizado com sucesso!',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });

        // Indo para pagina Home
        setTimeout(() => {
          navigate('/index')
        }, 2000);

      });
  }

  const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;
    return emailRegex.test(email);
  };  
  
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="login">

      <div className="login-container">

        <div className="card">

          <label htmlFor="email"> Email: </label>
          <input id="email" type="text" />

          <div className="error-container"> <p></p> </div>

          <label htmlFor="password"> Senha: </label>
          <input id="password" type="password" />

          <div className="error-container"> <p></p> </div>

          <div className="recovery-password-container"> <a href="/"> Recuperar senha</a> </div>

          <div className="button-conatiner">
            <button className="button-send" onClick={HandleLogin}> Entrar </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login