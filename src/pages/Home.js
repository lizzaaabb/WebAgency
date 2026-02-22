import React, { useEffect } from 'react';
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

  useEffect(() => {
    document.title = 'Apollo Creations | საიტის აწყობა თბილისში | Web Development Tbilisi'

    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', 'Apollo Creations — საიტის აწყობა და ვებ გვერდის დამზადება თბილისში. ონლაინ მაღაზიის შექმნა, ლენდინგ გვერდი, კორპორატიული საიტი. Premium web development agency in Tbilisi, Georgia.')
    setMeta('keywords', 'საიტის აწყობა, ვებ გვერდის დამზადება, ვებ გვერდის დამზადება თბილისში, ონლაინ მაღაზიის შექმნა, ლენდინგ გვერდი, web development Tbilisi, web design Georgia, e-commerce Georgia, Apollo Creations')
    setMeta('robots', 'index, follow')

    // Open Graph (Facebook + Instagram use these)
    setMeta('og:title', 'Apollo Creations | საიტის აწყობა თბილისში | Web Development Georgia', true)
    setMeta('og:description', 'საიტის აწყობა და ვებ გვერდის დამზადება თბილისში. ონლაინ მაღაზიის შექმნა. Premium web development in Tbilisi, Georgia.', true)
    setMeta('og:url', 'https://apollocreations.ge', true)
    setMeta('og:type', 'website', true)
    setMeta('og:image', 'https://apollocreations.ge/og-image.jpg', true)
    setMeta('og:site_name', 'Apollo Creations', true)
    setMeta('og:locale', 'ka_GE', true)
  }, [])

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