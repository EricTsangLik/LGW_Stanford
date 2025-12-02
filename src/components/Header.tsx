import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const navItems = [
    '兒童課程',
    '嬰幼兒課程',
    '泳隊',
    '關於我們',
    '最新優惠',
    '網上服務',
    '家長登入'
  ];

  return (
    <header className="site-header">
      <div className="header-logo">
        <Link to="https://stanfordswim.com.hk/">
          <img 
            src="/images/logo.png" 
            alt="史丹福游泳" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = '<span class="text-2xl font-bold text-blue-600">史丹福游泳</span>';
            }}
          />
        </Link>
      </div>
      
      <nav className="header-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item}>
              <a href="#" onClick={(e) => e.preventDefault()}>{item}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
