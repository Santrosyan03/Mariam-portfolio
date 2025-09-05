import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <h2>Contact</h2>
      <p><FaPhone /> +1 (555) 123-4567</p>
      <p><FaEnvelope /> info@mariamlaw.com</p>
    </section>
  );
}
