console.log('Client side JS loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const temp = document.querySelector('#temp')
const text = document.querySelector('#text')
const locationTxt = document.querySelector('#location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    temp.textContent = 'Loading ...'
    text.textContent = ''
    locationTxt.textContent = ''

    fetch('/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                temp.textContent = data.error
                return console.log(data.error)
            }
    
            temp.textContent = data.current_temp + '°C'
            text.textContent = data.weather_description
            locationTxt.textContent = data.place_name
            console.log(data)
        })
    })
})

