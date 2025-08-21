import React from 'react'
import '../styles/Services.css'

const services = [
  {
    title: "Aesthetics & Performance",
    description: "We create digital experiences that move people—where flawless performance meets breathtaking design. Your visitors don't just browse; they're captivated by something truly extraordinary.",
    icon: require('../pics/s7.png'),
  },
  {
    title: "Purposeful Design",
    description: "Every interaction feels intentional, every moment curated. We design with both heart and precision, creating journeys that feel deeply personal yet undeniably premium.",
    icon: require('../pics/s1.png'),
  },
  {
    title: "Lasting Luxury",
    description: "Refined elegance that commands attention and respect. We craft sophisticated digital presences that don't just impress—they create lasting emotional connections with discerning audiences.",
    icon: require('../pics/s4.png'),
  },
]
function Services() {
  return (
    <div className='services-body'>
      {services.map((service, index) => (
        <div key={index} className='service-card'>
          <img src={service.icon} alt={service.title} className='service-icon' />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Services
