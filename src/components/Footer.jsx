import React from 'react';

const Footer = () => {
  const footerStyles = {
    footerContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '20px',
      backgroundColor: '#333',
      color: 'white',
    },
    footerSection: {
      margin: '0 15px',
    },
    sectionTitle: {
      marginBottom: '10px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      marginBottom: '5px',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
    },
    linkHover: {
      textDecoration: 'underline',
    },
    footerText: {
      textAlign: 'center',
      marginTop: '20px',
      color: 'white',
    },
  };

  return (
    <footer>
      <div style={footerStyles.footerContainer}>
        <div style={footerStyles.footerSection}>
          <h4 style={footerStyles.sectionTitle}>Контакты</h4>
          <ul style={footerStyles.list}>
            <li style={footerStyles.listItem}>
              <a href="#" style={footerStyles.link}>Обратная связь</a>
            </li>
            <li style={footerStyles.listItem}>
              <a href="#" style={footerStyles.link}>Поддержка</a>
            </li>
            <li style={footerStyles.listItem}>
              <a href="#" style={footerStyles.link}>Часто задаваемые вопросы</a>
            </li>
          </ul>
        </div>
        <div style={footerStyles.footerSection}>
          <h4 style={footerStyles.sectionTitle}>О компании</h4>
          <ul style={footerStyles.list}>
            <li style={footerStyles.listItem}>
              <a href="#" style={footerStyles.link}>О нас</a>
            </li>
            <li style={footerStyles.listItem}>
              <a href="#" style={footerStyles.link}>Карьера</a>
            </li>
            <li style={footerStyles.listItem}>
              <a href="#" style={footerStyles.link}>Новости</a>
            </li>
          </ul>
        </div>
        <div style={footerStyles.footerSection}>
          <h4 style={footerStyles.sectionTitle}>Социальные сети</h4>
          <ul style={footerStyles.list}>
            <li style={footerStyles.listItem}>
              <a href="#" style={footerStyles.link}>Facebook</a>
            </li>
            <li style={footerStyles.listItem}>
              <a href="#" style={footerStyles.link}>Instagram</a>
            </li>
            <li style={footerStyles.listItem}>
              <a href="#" style={footerStyles.link}>Twitter</a>
            </li>
          </ul>
        </div>
      </div>
      <p style={footerStyles.footerText}>
        &copy; 2024 ÆGIRINE. Все права защищены.
      </p>
    </footer>
  );
};

export default Footer;
