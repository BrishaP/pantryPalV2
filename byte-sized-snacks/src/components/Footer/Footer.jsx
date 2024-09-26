"use client";

import React from 'react';
import ReactDOM from 'react-dom'
import Link from 'next/link';
import styles from './Footer.module.css';
import Image from "next/image";


const Footer = () => {

 
  const pageLinks = [
     
   { href: '/item', text: '', image: '/images/fridge.png' },
 
    { href: '/shopping', text: '', image: '/images/add.png' },
   
      
  ];


  return (
    <footer className={styles.footer}>
      <ul className= {styles.footerList}>
        {pageLinks.map((link, index) => (
          <li key={index} className= {styles.footerItem}>
            <Link href={link.href}>
              <a className= {styles.footerLink}>
                {link.image &&
                  <Image
                    src={link.image}
                    alt={link.name}
                    width={70}
                    height={70}
                    className="footerIcon"
                  />}
                
                  
               </a>
              {link.icon}</Link>
           
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;