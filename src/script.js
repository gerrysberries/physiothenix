const menu = document.querySelector('#menu');
const hamburger = document.querySelector('#hamburger-button');
const reviewList = document.querySelector('#review-list');

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

		data.reviews.forEach(review => {
			let newLi = document.createElement('li');
			newLi.innerHTML = `
			<li class='slide absolute transition-transform flex flex-col mb-4 h-auto overflow-scroll justify-center items-center'>
				<div class='wrapper'>
					<div class='flex items-center'>
						<a class='mr-4' href="${review.authorAttribution.uri}"><img width=50 height=50 src=${review.authorAttribution.photoUri} alt="user-icon" /></a>
						<div>
							<a class='text-dark font-extrabold' href=${review.authorAttribution.uri}>${review.authorAttribution.displayName}</a>
							<a class='text-subtitle text-sm block' href="${review.authorAttribution.uri}">${review.relativePublishTimeDescription}</a>
						</div>
						<a class='ml-auto' href="${review.authorAttribution.uri}"><img width=30 height=30 src="../src/assets/google.png" alt="" /></a>
						</div>
					<p>
						${review.originalText.text}
					</p>
					<button class='w-full bg-blue-100 text-blue-700 font-extrabold rounded-sm'><a href="https://www.google.com/search?q=physiothenix&rlz=1C1CHBF_enCA879CA879&oq=physiothenix&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTINCAEQABiDARixAxiABDIKCAIQABixAxiABDIQCAMQLhiDARixAxiABBiKBTIHCAQQLhiABDINCAUQABiDARixAxiABDIGCAYQRRg9MgYIBxBFGDzSAQgxMDgxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#">See more reviews</a></button>
				</div>
			</li>
			`;
			reviewList.appendChild(newLi);
		});

		const slides = document.querySelectorAll('.slide');
		const btnLeft = document.querySelector('.slider-btn-left');
		const btnRight = document.querySelector('.slider-btn-right');

		let curSlide = 0;
		const maxSlide = slides.length;

		const goToSlide = function (slide) {
			slides.forEach((s, i) => {
				s.style.transform = `translateX(${100 * (i - slide)}%)`;
			});
		};

		goToSlide(0);

		const nextSlide = function () {
			if (curSlide === maxSlide - 1) {
				curSlide = 0;
			} else {
				curSlide++;
			}

			goToSlide(curSlide);
		};

		const prevSlide = function () {
			if (curSlide === 0) {
				curSlide = maxSlide - 1;
			} else {
				curSlide--;
			}

			goToSlide(curSlide);
		};

		btnRight.addEventListener('click', nextSlide);
		btnLeft.addEventListener('click', prevSlide);
	})
	.catch(error => {
		console.error('There has been a problem with your fetch operation:', error);
	});
