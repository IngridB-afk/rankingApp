import React from 'react'
import '../../styles/home.css'
import {Link} from "react-router-dom"

import Carousel from './Carousel';


export const Home = () => {
  return (
    <div>
          <div className='init-div'>
          <div className='home-div bg-animado-blue'>
          <Carousel/>
          <div className='decorative-divi'></div>
          <div className='decorative-divi-2'></div>
          
          </div>
          <h2 className='welcome'>Welcome to RankingApp</h2>
          <p className='where'>Where do you want to go first?</p>

          <div className='btns-apps'>
          <Link to="/Top"><button className="btn-apps">Top Apps</button></Link><br />
          <Link to="/Medium"><button className="btn-apps">Medium Apps</button></Link><br />
          <Link to="/Worst"><button className="btn-apps">Worst Apps</button></Link><br />
          <Link to="/comparation"><button className="btn-apps">Company Comparator</button></Link><br />
          </div>
          <div className='circle-1'></div>
          <div className='circle-2'></div>
          </div>
    </div>
  )
}
 export default Home