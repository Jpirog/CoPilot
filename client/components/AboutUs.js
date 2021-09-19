import React from 'react'
import { Link } from 'react-router-dom';

export const AboutUs = props => {
  return (
    <div id="content-wrapper">
      <div className="hero">
        <img src="" />
        <div className="hero-text">
          <div className="brandblock"></div>
          <h1>Copilot, your partner for group traveling</h1>
          <h2>Let CoPilot make your group trip planning a breeze!</h2>
          <h2>&nbsp;</h2>
          <Link to="/login"><button className="cta">Login</button></Link>
            <h2>or</h2>
          <Link to="/signup"><button className="cta">Sign Up</button></Link>
        </div>
      </div>
      <div className="hpcontent hpsection-1">
        <div className="hpsection-1-imgA">
        </div>
        <div className="hpsection-1-txt">
          <br /><br />
          <div className="brandblock"></div>
          <h1>About CoPilot</h1>
          <h3>We’re a group of friends who want to make travel planning easier!</h3>
          <p>&nbsp;</p>
          <h4>Have you ever tried to plan a trip with friends and/or family and encountered:</h4>
          <p>&nbsp;</p>
          <ul>
            <li>Arriving at your destination with no plans for anything?</li>
            <li>Spending hours researching only to find that some don’t want to do that?</li>
            <li>Coordinating multiple group conference calls to plan what to do and where to go?</li>
          </ul>

          <p>It’s time to let CoPilot make your pre-trip planning a breeze!</p>

          <p><strong>Sign up and start planning a trip today.</strong></p>

          <form action="https://www.honeybeecoffeeco.com/blog/2020/4/2/6-benefits-of-buying-locally-roasted-coffee">
            <Link to="/signup"><button className="cta">Sign up</button></Link>
           </form>
      </div>
    </div>

    <div className="hpcontent itemList col3">
      <div>
        <div className="itemcard">
          <div>
            <a href="https://www.stumptowncoffee.com/pages/brew-guide-french-press">
              <img src="./images/restaurant-AdobeStock_260002250.jpeg.crdownload.jpeg" />
              <br />
              <h3>Dining</h3>
              <p>Quickly find restaurants and add to the itinerary. If too many choices are suggested, call for a vote!</p>
            </a>
          </div>
        </div>
        <div className="itemcard">
          <div>
            <a href="https://www.stumptowncoffee.com/pages/brew-guide-vacuum-pot">
              <img src="./images/museum-AdobeStock_203855138.jpeg" />
              <br />
              <h3>Attractions</h3>
              <p>Search and find local atractions to visit and create long-lasting memories</p>
            </a>
          </div>
        </div>
        <div className="itemcard">
          <div>
            <a href="https://www.stumptowncoffee.com/pages/brew-guide-aeropress">
              <img src="./images/beach-AdobeStock_255844455.jpeg" />
              <br />
              <h3>Relax</h3>
              <p>Plan time to relax at a park or beach, or block out time for "me" time.</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="hpcontent hpsection-1">
      <div className="hpsection-1-txt">
        <br /><br />
        <div className="brandblock"></div>
        <h1>Destress your life</h1>
        <p>There is enough stress and pressure in life. Let us help your group collaboratively plan out your next trip so you can arrive prepared and ready to enjoy. </p>
        <form action="https://youmatter.world/en/definition/ecosystem-definition-example/">
          <Link to="/signup"><button className="cta">Sign up</button></Link>
        </form>
      </div>
      <div className="hpsection-1-imgB">
      </div>
    </div>

    <div className="hpcontent hpsection-1">
      <div className="hpsection-1-txt">
        <br /><br />
        <div className="brandblock"></div>
        <h1>Detailed Itinerary</h1>
        <p>Easily plan out activities and dining for each day of your trip. A detailed itinerary will be created with all of your choices. Items can be added to personal calendars to have all events easily available on your phone. </p>
        <form action="https://youmatter.world/en/definition/ecosystem-definition-example/">
          <Link to="/signup"><button className="cta">Sign up</button></Link>
        </form>
      </div>
      <div className="hpsection-1-imgC">
      </div>
    </div>
  </div>
  )
}
