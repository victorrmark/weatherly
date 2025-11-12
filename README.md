# Weather Now (Frontend Mentor - Weather app solution)
A simple, modern weather web app that provides real-time forecasts, temperature, visibility, and other weather details using the Open-Meteo API.

This is my solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49).

## Table of contents

- [Overview](#overview)
  - [Features](#features)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  
- [Author](#author)


## Overview

### Features

- Get current weather and forecasts for any location by entering a location in the search bar
- Automatic location detection
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown 
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- Responsive and minimal UI
- Hover and focus states for all interactive elements on the page


## My process

### Built with

- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- Tailwind
- Tanstack Query for data fetching and good state management
- API: [Open-Meteo API](https://open-meteo.com/)
- Geolocation: Browser Geolocation API
- Geolocation SUpport: [Nomatim](https://nominatim.openstreetmap.org)
- @tabler/icons-react - Comprehensive icon library
- Sonner - for toast notifications


### What I learned

While building this project, I learned how to:
- Work with the Open-Meteo API to fetch real-time weather data.
- Use TanStack Query for the first time to manage API requests and caching efficiently: It simplified data fetching by handling loading, error, and refetch states automatically. I didn't have to write useEffect, useState, and endless loading/error logic manually.

### Continued development

- Work more with Tanstack Query and use it other features in other projects
- For this project, i would want to add a section where two or more weather information can be compared side by side


## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/victorrmark)
- Twitter - [@victorrmark](https://www.twitter.com/victorrmark)


