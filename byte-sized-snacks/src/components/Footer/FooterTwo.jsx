"use client";

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarrot, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
`;

const StyledCarrotIcon = styled(FontAwesomeIcon)`
  color: orange;
  font-size: 70px;
`;

const StyledCirclePlusIcon = styled(FontAwesomeIcon)`
  color: green;
  font-size: 70px;
`;

const FooterTwo = () => {

  const handleClick = (event) => {
    event.preventDefault();
    console.log('Link clicked!');
  };

  return (
    <FooterContainer>
      <Link href="/ListPages" onClick={handleClick} title="Feature coming soon">
        <StyledCarrotIcon icon={faCarrot} />
      </Link>
      <Link href="/AddItem" onClick={handleClick} title="Feature coming soon">
        <StyledCirclePlusIcon icon={faCirclePlus} />
      </Link>
    </FooterContainer>
  );
};

export default FooterTwo;

