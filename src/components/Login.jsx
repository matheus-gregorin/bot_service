import "./css/Login.css"

// Library

//Url
// const url = 'http://localhost:8000/api/auth/login'

const Login = () => {

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
            <button> Entrar </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login