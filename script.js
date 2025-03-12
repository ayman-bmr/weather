

const loadingElement = document.querySelector(".loading");
function showLoading() {
    if (loadingElement){
    loadingElement.style.display = "block";
    }
}
function hideLoading() {
    if (loadingElement){
    loadingElement.style.display = "none";
    }
}

showLoading();
function showweather(position){
    alert(position.coords.latitude)
    const xhr=new XMLHttpRequest();
xhr.open('GET','https://api.weatherapi.com/v1/forecast.json?key=fb02a65d29f54562858220921252702&q=oujda&days=7&aqi=no&alerts=no');

    xhr.onload=function(){
        hideLoading();
        var data=JSON.parse(xhr.response);
        console.log(data);
        document.querySelector(".ville").innerHTML=data.location.name;
        document.querySelector(".now")  .innerHTML=Math.round(data.current.temp_c)+"°";
        
        document.querySelector(".max")  .innerHTML=Math.round(data.forecast.forecastday[0].day.maxtemp_c)+"°";
        document.querySelector(".min")  .innerHTML=Math.round(data.forecast.forecastday[0].day.mintemp_c)+"°";
        document.querySelector(".feels").innerHTML=Math.round(data.current.feelslike_c)+"°";
        document.querySelector(".day").innerHTML=data.location.localtime;
        document.querySelector(".timesunrise").innerHTML=data.forecast.forecastday[0].astro.sunrise;
        document.querySelector(".timesunset").innerHTML=data.forecast.forecastday[0].astro.sunset;
       
    
        const currentTimes = data.location.localtime; 
        const currentHour = parseInt(currentTimes.split(" ")[1].split(":")[0]);
            
            const hourly = data.forecast.forecastday[0].hour;
            const container = document.querySelector(".first");
            container.innerHTML = ''; 
            const currentTime = data.location.localtime.split(" ")[1]; 
    const sunriseTime = data.forecast.forecastday[0].astro.sunrise.split(" ")[0]; 
    const sunsetTime = data.forecast.forecastday[0].astro.sunset.split(" ")[0];
    
    const weatherConditionIcon = data.current.condition.icon; 
    const weatherConditionText = data.current.condition.text; 
    
    const dayNightIconContainer = document.getElementById("day-night-icon");
    
    function setWeatherIcon(iconUrl, altText) {
       
        dayNightIconContainer.innerHTML = "";
    
        
        const weatherIcon = document.createElement("img");
        weatherIcon.src = iconUrl; 
        weatherIcon.alt = data.current.condition.text; 
    
        dayNightIconContainer.appendChild(weatherIcon);
    }
    
    setWeatherIcon(weatherConditionIcon, weatherConditionText);
    
            for (let i = currentHour; i < currentHour + 24; i++) {
                const hourIndex = i % 24; 
                const hourData = hourly[hourIndex];
                const hourElement = document.createElement("div");
                hourElement.className = "hourly-item"; 
                hourElement.innerHTML = `
                    <p> ${hourData.time.split(" ")[1]}</p>
                    <p> ${Math.round(hourData.temp_c)}°C</p>
                    <p><img src="${hourData.condition.icon}" alt="${hourData.condition.text}"></p>
                    
                `;
                container.appendChild(hourElement);
        }
        const daily = data.forecast.forecastday; 
    const container1 = document.querySelector(".second"); 
    const dayForecasts = container1.querySelectorAll("div"); 
    
    for (let i = 0; i < 7; i++) {
        const dayData = daily[i]; 
        const dayForecast = dayForecasts[i]; 
    
        
        const dayName = dayForecast.querySelector(".day");
        dayName.textContent = new Date(dayData.date).toLocaleDateString("en-US", { weekday: "long" }); 
        const chanceOfRain = dayForecast.querySelector(".fa-droplet");
        chanceOfRain.nextSibling.textContent = `${dayData.day.daily_chance_of_rain}%`; 
    
        const maxTemp = dayForecast.querySelector(".max");
        maxTemp.textContent = `${Math.round(dayData.day.maxtemp_c)}°`; 
        const minTemp = dayForecast.querySelector(".min");
        minTemp.textContent = `${Math.round(dayData.day.mintemp_c)}°`; 
        const isDay = dayData.day.condition.is_day; 
        const weatherIcon = dayForecast.querySelector(".weather-icon");
        weatherIcon.src= dayData.day.condition.icon;
    
    }
    const containerback=document.querySelector(".container");
    const isday=data.current.is_day;
    if(isday===1){
        containerback.style.background = "linear-gradient(rgb(74, 137, 220), rgb(30, 150, 168))";
    }
    else{
        containerback.style.background = "linear-gradient(rgb(12, 20, 69), rgb(24, 42, 72))";
    }
    
    
    };
    xhr.onerror=function(){
        console.log('error');
    };
    xhr.send();
}
function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showweather);
        error=>{console.log(error);}
    }else{}
}

getlocation();
