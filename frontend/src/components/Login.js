import React from 'react';

function Login(props) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    props.handleLogin(email, password);
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>

      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="E-mail"
        />

        <input
          className="login__input"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder='Пароль'
        />

        <button type="submit" className="login__button">
          Войти
        </button>
      </form>

      <p className="login__caption"></p>
    </div>
  );
};

export default Login;