/* 
    Profile example:

    "_id": "67e5e7348fab53ee8b23f15a",
    "name": "Darlin Arias",
    "email": "darlin.code@gmail.com",
    "owner": "67e005931f2090b6a9256130",
    "publicId": "57293809-0e9a-49e6-8acf-f08700323740",
    "description": "Mi nombre es Darlin Arias, desarrollador FullStack con un amplio conocimiento en tecnologías Backend y Frontend, como Node.JS, Express.JS, MongoDB, React, TailwindCSS y más.",
    "phone": "8099774365",
    "images": {
        "avatar": "https://stale-ardenia-drln-dev-5fc2ec58.koyeb.app/api/v1/images/67f08752789f6a5b85786bce",
        "cover": "https://stale-ardenia-drln-dev-5fc2ec58.koyeb.app/api/v1/images/67f092f2789f6a5b85786c0e"
    },
    "role": "freelancer",
    "price": {
        "currency": "usd",
        "amount": 10
    },
    "service": "web_development",
    "technologies": [
        "javascript",
        "typescript",
        "mysql",
        "mongodb",
        "php",
        "css",
        "html",
        "nodejs",
        "express",
        "react"
    ],
    "createdAt": 1743120180682 
*/

/*
    Filters example:

    name: 'Dar',
    minPrice: 0,
    maxPrice: 100,
    service: 'web_development',
    technology: 'typescript'
*/


export function applyFilters(filters, profiles) {
    const { name: filterName, minPrice, maxPrice, service: filterService, technology } = filters;

    let filteredProfiles = profiles;

    if (filterName) {
        filteredProfiles = filteredProfiles.filter(profile =>
            profile.name.toLowerCase().includes(filterName.toLowerCase())
        );
    }

    // minPrice y maxPrice siempre son números válidos (incluso 0)
    filteredProfiles = filteredProfiles.filter(profile =>
        profile.price.amount >= minPrice && profile.price.amount <= maxPrice
    );

    if (filterService) {
        filteredProfiles = filteredProfiles.filter(profile =>
            profile.service === filterService
        );
    }

    if (technology) {
        filteredProfiles = filteredProfiles.filter(profile =>
            profile.technologies.includes(technology)
        );
    }

    return filteredProfiles;
}
