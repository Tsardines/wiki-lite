// import $ from "/node_modules/src/jquery.js";

function colChange(color) {
  document.body.style.background = color;
}

function handleSubmit(event) {
    // prevent page from reloading when form is submitted
  event.preventDefault();
  // get the value of the input field
  const input = document.querySelector('.searchForm-input').value;
  // remove whitespace from the input
  const searchQuery = input.trim();
  // call `fetchResults` and pass it the `searchQuery`
  fetchResults(searchQuery);
}

function fetchResults(searchQuery) {
  let endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
  
  fetch(endpoint)
	.then(res => res.json())
	.then(data => {
		let results = data.query.search;
		displayResults(results);
	})
	.catch(() => console.log("An error hath occurred"));
}

function displayResults(results) {
	// store a reference to '.searchResults'
	let searchResults = document.querySelector(".searchResults");
	
	// remove all child elements
	searchResults.innerHTML = '';

	// loop over results arr
	results.forEach(result => {
		const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

		searchResults.insertAdjacentHTML('beforeend',
      `<div class="resultItem">
        <h3 class="resultItem-title">
          <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="resultItem-snippet">${result.snippet}</span><br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
      </div>`
    	);	
	})
}




const form = document.querySelector('.searchForm');
form.addEventListener('submit', handleSubmit);





