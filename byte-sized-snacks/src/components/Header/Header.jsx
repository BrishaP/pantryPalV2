"use client";

import React from 'react'
import styles from './Header.module.css';
import Image from "next/image";
import Link from "next/link";



const Header = () => {
    return (
        <header className = {styles.headerStyle}>
            <h1 className = {styles.title}>PANTRY PAL</h1>
        </header>
    )
}

export default Header;
