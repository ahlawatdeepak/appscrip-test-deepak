'use client';

import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';
import {
  FaCcVisa, FaCcMastercard, FaCcPaypal,
  FaCcAmex, FaApplePay, FaGooglePay,
  FaLinkedin, FaInstagram
} from 'react-icons/fa';
import { SiShopify } from 'react-icons/si';
import Accordion from '../Accordion';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [mettaMuseOpen, setMettaMuseOpen] = useState(false);
  const [followUsOpen, setFollowUsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleQuickLinks = () => isMobile && setQuickLinksOpen(prev => !prev);
  const toggleMettaMuse = () => isMobile && setMettaMuseOpen(prev => !prev);
  const toggleFollowUs = () => isMobile && setFollowUsOpen(prev => !prev);

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.newsletter}>
          <h4>BE THE FIRST TO KNOW</h4>
          <p>Sign up for updates from mettā muse.</p>
          <div className={styles.subscribeForm}>
            <input type="email" placeholder="Enter your e-mail..." />
            <button>SUBSCRIBE</button>
          </div>
        </div>
        <div className={styles.contactCurrency}>
          <h4>CONTACT US</h4>
          <p>+44 221 133 5360</p>
          <p>customercare@mettamuse.com</p>
          <h4 style={{ marginTop: '1rem' }}>CURRENCY</h4>
          <p>🇺🇸 USD</p>
          <small>Transactions will be completed in Euros and a currency reference is available on hover.</small>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.bottomSection}>
        {isMobile ? (
          <>
            <Accordion title="mettā muse" isOpen={mettaMuseOpen} toggleOpen={toggleMettaMuse}>
              <ul className={styles.mobileList}>
                <li>About Us</li>
                <li>Stories</li>
                <li>Artisans</li>
                <li>Boutiques</li>
                <li>Contact Us</li>
                <li>EU Compliances Docs</li>
              </ul>
            </Accordion>

            <Accordion title="QUICK LINKS" isOpen={quickLinksOpen} toggleOpen={toggleQuickLinks}>
              <ul className={styles.mobileList}>
                <li>Orders & Shipping</li>
                <li>Join/Login as a Seller</li>
                <li>Payment & Pricing</li>
                <li>Return & Refunds</li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </Accordion>

            <Accordion title="FOLLOW US" isOpen={followUsOpen} toggleOpen={toggleFollowUs}>
              <div className={styles.socialIcons}>
                <span><FaInstagram size={16} className={styles.socialIcon} /></span>
                <span><FaLinkedin size={16} className={styles.socialIcon} /></span>
              </div>
             
            </Accordion>
            <div className={styles.payments}>
                <h4>mettā muse ACCEPTS</h4>
                <div className={styles.paymentMode}>
                  <FaGooglePay size={40} />
                  <FaCcVisa size={40} />
                  <FaCcMastercard size={40} />
                  <FaCcPaypal size={40} />
                  <FaCcAmex size={40} />
                  <FaApplePay size={40} />
                  <SiShopify size={40} />
                </div>
              </div>
          </>
        ) : (
          <>
            <div className={styles.column}>
              <h4>mettā muse</h4>
              <ul>
                <li>About Us</li>
                <li>Stories</li>
                <li>Artisans</li>
                <li>Boutiques</li>
                <li>Contact Us</li>
                <li>EU Compliances Docs</li>
              </ul>
            </div>

            <div className={styles.column}>
              <h4>QUICK LINKS</h4>
              <ul>
                <li>Orders & Shipping</li>
                <li>Join/Login as a Seller</li>
                <li>Payment & Pricing</li>
                <li>Return & Refunds</li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>

            <div className={styles.column}>
              <h4>FOLLOW US</h4>
              <div className={styles.socialIcons}>
                <span><FaInstagram size={16} className={styles.socialIcon} /></span>
                <span><FaLinkedin size={16} className={styles.socialIcon} /></span>
              </div>
              <div className={styles.payments}>
                <h4>mettā muse ACCEPTS</h4>
                <div className={styles.paymentMode}>
                  <FaGooglePay size={40} />
                  <FaCcVisa size={40} />
                  <FaCcMastercard size={40} />
                  <FaCcPaypal size={40} />
                  <FaCcAmex size={40} />
                  <FaApplePay size={40} />
                  <SiShopify size={40} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <p className={styles.copyright}>
        Copyright © 2023 mettamuse. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
