"use client";

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarrot, faCirclePlus, faKitchenSet, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import fridge from './../../../public/images/fridge.png';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #F8F9FA;
  border-top: 1px solid #E9ECEF;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StyledCarrotIcon = styled(FontAwesomeIcon)`
  color: orange;
  font-size: 70px;
`;

const StyledCirclePlusIcon = styled(FontAwesomeIcon)`
  color: green;
  font-size: 70px;
`;

const StyledKitchenSetIcon = styled(FontAwesomeIcon)`
  color: blue;
  font-size: 40px;

`;

const StyledCartShopping = styled(FontAwesomeIcon)`
  color: gold;
  font-size: 40px;

`;


const Footer = () => {

  const handleClick = (event) => {
    event.preventDefault();
    console.log('Link clicked!');
  };

  return (
    <FooterContainer>

     <Link href="/ListPages" onClick={handleClick} title="Recipe Feature coming soon">
       <StyledKitchenSetIcon icon={faKitchenSet} />
      </Link>
  


      <Link href="/ListPages" onClick={handleClick} title="Shopping List coming soon">
     
        <StyledCartShopping icon={faCartShopping} />
        {/* <StyledCarrotIcon icon={faCarrot} /> */}
      </Link>

     
    </FooterContainer>
  );
};

export default Footer;