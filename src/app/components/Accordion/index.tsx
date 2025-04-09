import React from 'react';
import styles from './Accordion.module.css';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface AccordionProps {
  title: string;
  isOpen: boolean;
  toggleOpen: () => void;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, isOpen, toggleOpen, children }) => {
  return (
    <div className={styles.column}>
      <div className={styles.accordionHeader} onClick={toggleOpen}>
        <h4>{title}</h4>
        <span className={styles.toggleIcon}>{isOpen ? <BiChevronDown/> : <BiChevronUp/>}</span>
      </div>
      {isOpen && (
        <div className={`${styles.accordionContent} ${styles.show}`}>
          {children}
        </div>
      )}
     <div className={styles.accordionDivider}/>
    </div>
  );
};

export default Accordion;
