import React, { useState, useEffect } from 'react'; 
import '../styles/Header.css'
//import CircleType from 'circletype';  // This is for the npm package
import union from '../pics/union.png'
import cover from '../pics/gradient.png'

//const coverImage = '/cover1.png'; // Note: No `public/` folder needed
//const logoImage = '/thin-arrow.png';
//const phoneBackground = '/forphone.png';




function Header() {

    const [rotatedText, setRotatedText] = useState([]);
    const [isMobile, setIsMobile] = useState(false); 

    const handleScroll = () => {
        window.scrollBy({
          top: 680, // Scroll down by 200px (you can adjust this number)
          behavior: 'smooth', // Smooth scroll effect
        });
      };

useEffect(() => {
  const text = "SCROLL TO EXPLORE  SCROLL TO EXPLORE  SCROLL TO EXPLORE  ";
  const letters = text.split("");
  
  setRotatedText(letters);
}, []);


useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
  
    handleResize();
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const backgroundImage = isMobile ? `url(${process.env.PUBLIC_URL}/forphone.png)` : `url(${process.env.PUBLIC_URL}/cover1.png)`;
  

  return (
    <div className='body'  style={{
        backgroundImage: `url(${cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor:'#101010',
        height: '100vh'}}
    > 

    <div className="header-container">
        <div className="first-block">
        <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('about'); }}>About</a>
        <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('pricing'); }}>Services</a>
    </div>
        <div className="second-block">
            <h4 className='header-title'>APOLLO</h4>
        </div>
       <div className="third-block">
        <a href="#">Projects</a>
        <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('contact'); }}>Contact</a>
    </div>
    </div>



    <div className='hero-body'>

        <div className="block1">
            <span>Digital</span>
            <span>Agency</span>

        </div>

        <div className="block2">
            <div className="first-title">
                <div className="first-title-container">
                    <h1 className='title1'>WE ARE</h1>
                </div>
                <div className="first-title-container2">
                    <h1 className='title2'>FULL-SERVICE</h1>
                </div>

            </div>
            <div className="second-title">
                <div className="second-title-container">
                    <h1 className='title3'>AGENCY</h1>
                </div>
                <div className="second-title-container2">
                <span>Premium full-stack web <br /></span>
                <span>development agency shaping <br /></span>
                <span>the future with cutting-edge <br /></span>
                <span>tech and design.</span>


                </div>
            </div>
        </div>

        <div className="block3">
            <img src={union} alt="arrow"  className='arrow'/>

        </div>
      
    </div>


        <div className="scroll-container">

        <div className="circle">

            <div className="logo-circle">
             <div
                className="logo" id="blue-glow-effect"
                onClick={handleScroll}
                style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/thin-arrow.png)`, backgroundSize: 'cover', zIndex:1 }}
                ></div>
            </div>
           
        
      <div className="text-container">
            <div className="text">
                {rotatedText.map((char, index) => (
              <span
                key={index}
                style={{
                transform: `rotate(${index * (360 / rotatedText.length)}deg) translateX(-50%)`,
               // marginRight: char === " " ? "20px" : "0",  // Ensure space between words
              
                 }}
                    >
                {char}
                </span>
                     ))}
            </div>
            </div>
</div>


        

        

        

        </div>
      
    </div>


  )
}

export default Header
