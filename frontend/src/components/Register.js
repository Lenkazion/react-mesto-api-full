import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    React.useEffect(() => {
        if (props.isDataSet) {
          setData({ email: '', password: '' });
        }
    }, [props.isDataSet]);

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
        props.handleRegister(email, password);
    };

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>

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
          Зарегистрироваться
        </button>
      </form>

      <p className="login__caption">
        Уже зарегистрированы?&nbsp;
        <Link to="/sign-in" className="login__link">
          Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;