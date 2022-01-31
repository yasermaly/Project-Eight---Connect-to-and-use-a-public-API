/*
   Team Treehouse Techdegree
   Project 8 - Connect to and use a public API
*/

/* 
    Project Notes: 
    I am going for an 'Exceeds Expectations grade! :)
    Added a searchbar to filter the directory by name
    Added forward and back buttons to move between employee detail windows when the modal window is open.
*/

// Global variables
let employees = [];
const usersUrl = `https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.window-content');
const modalClose = document.querySelector('.window-closer');
const searchButton = document.querySelector('.searchbutton');
const searchBar = document.querySelector('#search');


// Fetch data from API
fetch(usersUrl)
  .then(res => res.json())
  .then(res => res.results)
  .then(storeFetchData)
  .catch(err => console.log(err))


//Store fetched data
function storeFetchData(employeeData) {
  employees = employeeData;
  getProfiles(employeeData)
}

//Create a card per employee using the fetched data.  
function getProfiles(employeeData) {

  let employeeCard = '';

  employeeData.forEach((employee,index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    
    // Generate the markup for each profile
    employeeCard += `
    <div class="card" data-index="${index}">
      <img class="avatar" src="${picture.large}" alt="avatar">
      <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
      </div>
    </div>
    `;
  });

  gridContainer.innerHTML = employeeCard;
}


// Create a modal window when user clicks on an employee
function displayModalWindow(index) {
  
    let { name, dob, phone, email, location: {city, street, state, postcode}, picture } = employees[index];
    let birthDate = new Date(dob.date);
    let month = birthDate.getMonth() + 1;
    let date = birthDate.getDate();
    
    employeeModalWindow = `
      
        <img class="avatar" src="${picture.large}" alt="avatar">
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
          <hr/>
          <p>${phone}</p>
          <p class="address">${street.number} ${street.name}, ${city}, ${state} ${postcode}</p>
          <p>Birthday: ${month}/${date}/${birthDate.getFullYear()}</p>
        </div>
      
      `;
  
  overlay.classList.remove('hidden');
  modalContainer.innerHTML = employeeModalWindow;
}

//Take user input and iterate through all employee cards looking for matches
function searchMatches () {
  const searchBar = document.querySelector('#search');
  const searchInput = searchBar.value.toLowerCase();
  let match = [];
  for ( let i = 0; i < employees.length; i++ ) {
    const employeeList = employees[i];
    const employeeName = employees[i].name.first.toLowerCase() + ' ' + employees[i].name.last.toLowerCase();
    if (employeeName.includes(searchInput)) {
      match.push(employeeList);
    }
  }
  if (match.length >= 1) {
    getProfiles(match);
    console.log(match.length);
 } else {
  console.log(match.length);
  const noMatch = '<h2>No results found</h2>';
  gridContainer.innerHTML = noMatch;
  
}}

// Variables to work with modal window
let btnPrev = document.getElementById('prev');
let btnNext = document.getElementById('next');
let prevModal;
let nextModal;
let currentIndex;
let index;


gridContainer.addEventListener('click', (e) => {
  if (e.target !== gridContainer) {
    const card = e.target.closest('.card');
    index = card.getAttribute('data-index');
    
    nextModal = index;
    prevModal = index;
    currentIndex = index;

    displayModalWindow(index);
    console.log(index);
  }
  console.log(index);
  console.log(currentIndex);

});


btnPrev.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    btnPrev.disable = false;
  }
  if (currentIndex === 0) {
    btnPrev.disable = true;
  }
  displayModalWindow(currentIndex);
  console.log(currentIndex);
})

btnNext.addEventListener('click', () => {
  if (currentIndex <= employees.length) {
    currentIndex++;
    btnNext.disable = false;
  }
  if (currentIndex === employees.length - 1) {
    btnNext.disable = true;
  }
  displayModalWindow(currentIndex);
  console.log(currentIndex);
})

modalClose.addEventListener('click', () => {
  overlay.classList.add('hidden');
})


// Filter the search results by either clicking or typing
searchButton.addEventListener('click', (e) => e.target = searchMatches(employees));

search.addEventListener('keyup', e => {
  searchInput = e.target.value.toLowerCase();
  console.log(searchInput);
  searchMatches(employees);
});