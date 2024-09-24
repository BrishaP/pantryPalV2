"use client";

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const pageLinks = [
    { href: '/', text: '🏚️Home' },
    { href: '/item', text: '📃Add item' },
    { href: '/inventory', text: '🍇🍓🍌Inventory' },
    { href: '/shopping', text: '🛒Shopping' },
  ];

  return (
    <footer className={styles.footer}>
      <ul>
        {pageLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>{link.text}</Link>
            <h1>🍇🍓🍌</h1>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;