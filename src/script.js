const menu = document.querySelector('#menu');
const hamburger = document.querySelector('#hamburger-button');
const reviewList = document.querySelector('#reviews');

let innerHTML;

console.log(reviewList);

hamburger.addEventListener('click', e => {
	menu.classList.toggle('hide');
	console.log('test');
});

const KEY = 'AIzaSyAcyQg-7776-z2NMkVUJku5fn1EHfI8D9Y';
let newObj;

fetch(`https://places.googleapis.com/v1/places/ChIJkRz5KHAzK4gRcCwil2IGT8o?fields=id,displayName,reviews,userRatingCount&key=${KEY}`)
	.then(response => {
		// Check if the response is successful
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json(); // Parse the JSON response
	})
	.then(data => {
		console.log(data.reviews);

		data.reviews.map(review => {
			let newLi = document.createElement('li');

			newLi.innerHTML = `
			<li class='mb-4'>
				<p>
					${review.text.text}
				</p>
			</li>
			`;

			reviewList.appendChild(newLi);
		});
	})
	.catch(error => {
		console.error('There has been a problem with your fetch operation:', error);
	});
