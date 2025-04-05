import { isAuth } from '../../auth/scripts/auth.js';
import { profileCard } from './profileCard.js';
import { applyFilters } from './applyFilters.js';

const getProfilesEndpoint = 'https://api-rest-emprendi.onrender.com/profiles';
const profilesContainer = document.getElementById('profiles');

let initialProfiles = [];
let profilesToShow = [];

// Filters inputs:
const profileName = document.getElementById('profile-name');
const minPrice = document.getElementById('min-price');
const maxPrice = document.getElementById('max-price');
const service = document.getElementById('slt-services');
const technology = document.getElementById('slt-technologies');

// Filters
const filters = {
    name: '',
    minPrice: 0,
    maxPrice: 0,
    service: '',
    technology: ''
}

// Initial set:
document.addEventListener('DOMContentLoaded', async () => {
    filters.name = profileName.value;
    filters.minPrice = minPrice.value;
    filters.maxPrice = maxPrice.value;
    filters.service = service.value;
    filters.technology = technology.value;

    const { isUserAuth, session } = await isAuth();

    if (!isUserAuth) return;

    const response = await fetch(getProfilesEndpoint, {
        headers: {
            Authorization: `Bearer ${session}`
        }
    });

    if (!response.ok) {};

    const json = await response.json();

    const { data } = json;
    const { profiles } = data;

    [ initialProfiles, profilesToShow ] = [ profiles, profiles ];
    applyFiltersAndSetProfiles();
})

// Event listeners for filters inputs:
profileName.addEventListener('input', (e) => {
    filters.name = e.target.value;
    applyFiltersAndSetProfiles();
});

minPrice.addEventListener('change', (e) => {
    filters.minPrice = e.target.value;
    applyFiltersAndSetProfiles();
});

maxPrice.addEventListener('change', (e) => {
    filters.maxPrice = e.target.value;
    applyFiltersAndSetProfiles();
});

service.addEventListener('change', (e) => {
    filters.service = e.target.value;
    applyFiltersAndSetProfiles();
});

technology.addEventListener('change', (e) => {
    filters.technology = e.target.value;
    applyFiltersAndSetProfiles();
});

function applyFiltersAndSetProfiles() {
    profilesToShow = applyFilters(filters, initialProfiles);
    clearProfiles();

    profilesToShow.forEach(async profile => {
        const card = await profileCard({ profile });
        profilesContainer.appendChild(card);
    });
}

function clearProfiles() {
    profilesContainer.innerHTML = '';
}
