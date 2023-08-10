import { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import {FiSun, FiMoon} from 'react-icons/fi'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './Footer';

const Layout = ({ children }) => {
 const [theme, setTheme] = useState(false)

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  const toggleDarkMode = () => {
    setTheme(prev => !prev);
    localStorage.setItem('theme', theme);
  };

 const themeBtn = <button onClick={toggleDarkMode} className="p-2 text-xl">
          {theme  ? <FiSun /> : <FiMoon />}
        </button>
  return (
    <div className={`transition ${theme ? '' : ''}`}>
      <Navigation themeBtn={themeBtn}/>
        <main>{children}</main>
     <Footer/>
    </div>
  );
};

export default Layout;
