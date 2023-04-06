import React from "react";

function Footer() {
  const data = new Date();
  const year = data.getFullYear();
  return (
    <footer className="footer">
      <p className="footer__info">© {year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
