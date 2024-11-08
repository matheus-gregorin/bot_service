import "./css/Login.css"

// UseCases
import ApiService from '../useCases/fetchUseCase';

//Url
const url = 'http://localhost:8000'

const Login = () => {

  const HandleLogin = () => {

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    const api = new ApiService(url)
    api.post('/api/auth/login', {email: email, password: password})
    .then(
      response => console.log(response) // Logica aqui
    );

  }

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
            <button onClick={HandleLogin}> Entrar </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login