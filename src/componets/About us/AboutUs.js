import React, { useEffect } from "react";
import { motion } from "framer-motion";
import SlideOne from './kids.png'
import SlideTwo from './ruby.JPG'
import SlideThree from './vege.png'
import SlideFour from './tristan.JPG'
//Components
import './AboutUs.css'

const AboutUs = () => {
  useEffect(() => {
    document.title = "Eden | About Us ";
  }, []);
  return (
    
    
      <main className="about-us">
      <article className="section-one">
        <section className="section-one-content">
          <h2 className="bigTitle">About us</h2>
          <h3 className='sub-title'>A Future-Forward Approach to Sustainable Agriculture</h3>
          <p className="smallTitle">
          In the face of escalating climate change, with its devastating impacts on traditional agricultural practices, the need for innovative, sustainable solutions has never been more pressing. The world is grappling with the dual challenge of rising populations and dwindling arable land. Enter our hydroponic horticulture solution - a beacon of hope in these challenging times. </p>
          <div className="section-one-glass"></div>
        </section>
        <section className="aboutus-img-grid">
          <img src={SlideOne} alt="" aria-hidden="true" />
          <img src={SlideTwo} alt="" aria-hidden="true" />
          <img src={SlideThree} alt="" aria-hidden="true" />
          <img src={SlideFour} alt="" aria-hidden="true" />
        </section>
      </article>
      <article className="section-two">
        <section className="section-two-content">
          <h2 className="sub-title hydrofont">Hydroponic</h2>
          <h3>Harnessing the Power of Technology </h3>
          <p className="montserrat-text">
          Moving away from the constraints of soil-based cultivation, our hydroponic system immerses plants in a nutrient-rich solution, providing them with every essential they need to thrive. Not only does this method conserve water and space, but it also offers the advantage of controlled environments, eliminating the unpredictabilities of weather and soil conditions.   
          Our state-of-the-art hydroponic test rig is equipped with advanced sensors and actuators that meticulously control every aspect vital for plant growth - from light and pH to temperature and humidity. Every reading, every change, every nuance of your plants' growth environment is available for you to monitor on this website.
          </p>
        </section>
        <div className="black-glass"></div>
      </article>

      </main>
   

  );
}

export default AboutUs;