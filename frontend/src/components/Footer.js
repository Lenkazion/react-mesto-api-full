import React from 'react';

function Footer() {
  const [year, setYear] = React.useState(2021);


  React.useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    setYear(year)
  }, []);

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {year} Elena Komushyna</p>
    </footer>
  );
}

export default Footer;