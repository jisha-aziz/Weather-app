import React, {useState} from 'react';
import { useEffect } from 'react';
import './style.css';
import axios from "axios";
function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name:'London',
    humidity: 10,
    speed: 2,
    image:'/Images/cloud.png'
  })
  const [name, setName] = useState('');
  
  const handleClick =() =>{
    if(name!==""){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=d68ea94a987b31b007d8fa19d26d832b&units=metric`;
      axios.get(apiUrl)
      .then(res => {
        let imagePath='';
        if(res.data.weather[0].main=="Clouds"){
          console.log(res.data.weather[0].main)
          imagePath ="/Images/cloud.png"
        } else if(res.data.weather[0].main == "Clear"){
          imagePath ="/Images/clear.png"
        }else if(res.data.weather[0].main =="Rain"){
          imagePath="/Images/Rain.png"
        }else{
          imagePath="/Images/cloud.png"
        }
        console.log(res.data);
        setData({...data,celcius:res.data.main.temp, name:res.data.name,
           humidity: res.data.main.humidity, speed:res.data.wind.speed,
          image:imagePath})
      })
      .catch(err => console.log(err));
    }
  }
  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                <button onClick={handleClick}><i className="fa fa-search" ></i>              
                </button>
               
            </div>
            <div className='winfo'>
              <img src={data.image} className='cloud'  alt="" />
              <h1> {Math.round(data.celcius)}°C</h1>
              <h2>{data.name}</h2>
              <div className='details'>
                <div className='col'>
                  <img src="/Images/wind.png"  className='cloud-1' alt="" />
                  <div className='humidity'>
                    <p>{Math.round(data.humidity)}%</p>
                    <p>Humidity</p>
                  </div>
                </div>
                <div className='col'>
                  <img src="/Images/humidity.png" className='cloud-2' alt="" />
                  <div className='wind'>
                    <p> {Math.round(data.speed)}km/hr</p>
                    <p>wind</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

    </div>
  )
}

export default Home