const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjM0ZDI2NDZlMGY2OTU1YTJhMWVlYzUiLCJpYXQiOjE2NDc2Mjg5NTksImV4cCI6MTY0ODIzMzc1OX0.IwciseEkB9NmpsiCp8aVZNiVkXkX0xtNDP5UhOm1Ti0'; // вставьте сюда JWT, который вернул публичный сервер студента
const SECRET_KEY_DEV = 'dev-secret'; // вставьте сюда секретный ключ для разработки из кода студента
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Чеклист для самопроверки. 15 Спринт. 2, Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
