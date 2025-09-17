// src/components/Footer.jsx


function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="mb-1">© {new Date().getFullYear()} Buystic</p>
        <small>
          Built with <span>❤️</span> using React.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
