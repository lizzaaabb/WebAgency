import React, { useState, useEffect } from 'react'; 
import '../styles/Header.css'
import union from '../pics/union.png'
import cover from '../pics/gradient.png'

const scrollImage = process.env.PUBLIC_URL + '/scroll3.png'; // Your transparent circle image

function Header() {
    const [isMobile, setIsMobile] = useState(false); 

    const handleScroll = () => {
        window.scrollBy({
          top: 680,
          behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
      
        handleResize();
        window.addEventListener('resize', handleResize);
      
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='body' style={{
            backgroundImage: `url(${cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor:'#101010',
            height: '100vh'
        }}> 
            <div className="header-container">
                <div className="first-block">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('about'); }}>About</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('pricing'); }}>Services</a>
                </div>
                <div className="second-block">
                    <h4 className='header-title'>APOLLO</h4>
                </div>
                <div className="third-block">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.navigateTo('projects'); }}>Projects</a>
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
                    <img src={union} alt="arrow" className='arrow'/>
                </div>
            </div>

            <div className="scroll-container">
                <div className="scroll-circle-wrapper" onClick={handleScroll}>
                    {/* Main rotating circle image */}
                    <img 
                        src={scrollImage} 
                        alt="Scroll to Explore" 
                        className="scroll-circle-image"
                    />
                    
                    {/* Center arrow */}
                    <div className="scroll-arrow-center">
                        <img 
                            src={process.env.PUBLIC_URL + '/arow3.png'} 
                            alt="arrow"
                            className="center-arrow"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;