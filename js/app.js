const API_KEY='962ff5ce6f2b4f18a9154854232006';
// 
let currentCity = "London"
let city = document.querySelector('.weather-city');
let datetime = document.querySelector('.weather-date-time');
let units = 'metric'

let weatherForecast = document.querySelector('.weather-forecast')

let weatherTemp = document.querySelector('.weather-temperature')

let weatherIcon = document.querySelector('.weather-icon')

let weatherMinMax = document.querySelector('.weather-minmax')

let realFeel = document.querySelector('.weather-real-feel')

let humidity = document.querySelector('.weather-humidity')

let wind = document.querySelector('.weather-wind')

let pressure = document.querySelector('.weather-pressure')

// function convertTimeStamp(timeStamp , timeZone){
//     const convertTimeZone = timeZone /3600 // convert second to hours

//     const date = new Date(timeStamp*1000)

//     const options = {

//         weekday:"long",
//         day:"numeric",
//         month:"long",
//         year:"numeric",
//         hour:"numeric",
//         minute:"numeric",
//         timeZone:`Etc/GMT${convertTimeZone => 0?"-":"+"}${Math.abs(convertTimeZone)}`,
//         hour12:true
//     }
//     return date.toLocaleString('en-US', options)
// }

document.querySelector('.weather-searchform').addEventListener('submit' , e=>{
    let search = document.querySelector('.search-form')
    e.preventDefault()

    currentCity = search.value;
    getWeather()
    search.value = ""
})

document.querySelector(".weather-unit-celisus").addEventListener('click' ,e=> {
    units = "metric"
    getWeather()
})
document.querySelector(".weather-unit-fahernheit").addEventListener('click' ,e=> {
    units = "imperial"
    getWeather()
})


function getWeather(){


    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY} &q=${currentCity}`).then(response=>
        response.json()).then(data=>{
            city.innerHTML = `${data.location.name} ,${data.location.country} `
            datetime.innerHTML = data.location.localtime

            weatherForecast.innerHTML = `<p>${data.current.condition.text}</p>`
            if (units == 'metric')
            {
                weatherTemp.innerHTML = `${
                    data.current.temp_c
                .toFixed()}&#176`
                realFeel.innerHTML= `${data.current.feelslike_c}&#176`
                
                wind.innerHTML= `${data.current.wind_kph} m/s`
                
                pressure.innerHTML= `${data.current.pressure_mb
                } hPa`
            }else{
                weatherTemp.innerHTML = `${data.current.temp_f.toFixed()}&#176`

                realFeel.innerHTML= `${data.current.feelslike_f}&#176`
                
                wind.innerHTML= `${data.current.wind_mph} m/s`
            }
            pressure.innerHTML= `${data.current.pressure_mb} hPa`

            weatherIcon.innerHTML =`<img src="${data.current.condition.icon}">`

            humidity.innerHTML= `${data.current.humidity}%`

        })
}
getWeather()