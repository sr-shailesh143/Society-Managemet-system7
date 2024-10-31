import React, { useState } from 'react';
import styled from 'styled-components';
import { HiMiniCurrencyDollar } from "react-icons/hi2"; // Icon for Financial Management

// Styled Components
const AccordionContainer = styled.div`
  width: 250px;
  font-family: Arial, sans-serif;
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: linear-gradient(90deg, #FE512E 0%, #F09619 100%);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
`;

const Icon = styled(HiMiniCurrencyDollar)`
  font-size: 20px;
  color: white;
  margin-right: 8px;
`;

const DropdownIcon = styled.span`
  font-size: 20px;
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s;
`;

const AccordionContent = styled.div`
  background-color: #fff;
  padding: 10px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  border-radius: 0 0 8px 8px;
`;

const MenuItem = styled.div`
  padding: 8px 0;
  color: #333;
  cursor: pointer;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  &:hover {
    color: #000;
  }
`;

const FinancialAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const toggleAccordion = () => setIsOpen(!isOpen);
  const handleMenuItemClick = (item) => setActiveItem(item);

  return (
    <AccordionContainer>
      <AccordionHeader onClick={toggleAccordion}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon />
          Financial Management
        </div>
        <DropdownIcon isOpen={isOpen}>▼</DropdownIcon>
      </AccordionHeader>

      <AccordionContent isOpen={isOpen}>
        <MenuItem isActive={activeItem === 'Income'} onClick={() => handleMenuItemClick('Income')}>Income</MenuItem>
        <MenuItem isActive={activeItem === 'Expense'} onClick={() => handleMenuItemClick('Expense')}>Expense</MenuItem>
        <MenuItem isActive={activeItem === 'Note'} onClick={() => handleMenuItemClick('Note')}>Note</MenuItem>
      </AccordionContent>
    </AccordionContainer>
  );
};

export default FinancialAccordion;
