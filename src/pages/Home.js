import React from 'react';
import Header from './Header';
import CardHeader from './CardHeader';
import Card3 from './Card3';
import ServiceHeader from './ServiceHeader';
import Services from './Services';
import WorkHeader from './WorkHeader';
import Work from './Work';
import ContactHeader from './ContactHeader';
import ContactForm from './ContactForm';
import Footer from './Footer';
import Menu from './Menu';
import Whatsapp from './Whatsapp';

function Home() {
  return (
    <>
      <Header />
      <Menu />
      <CardHeader />
      <Card3 />
      <ServiceHeader />
      <Services />
      <WorkHeader />
      <Work />
      <ContactHeader />
      <ContactForm />
      <Footer />

    </>
  );
}

export default Home;