const menu = document.querySelector('#menu');
const hamburger = document.querySelector('#hamburger-button');
const reviewList = document.querySelector('#review-list');
const gymImageList = document.querySelector('#gym-image-list');

let innerHTML;

hamburger.addEventListener('click', e => {
	menu.classList.toggle('hide');
});

const KEY = 'AIzaSyAcyQg-7776-z2NMkVUJku5fn1EHfI8D9Y';
let newObj;

function setupCarousel() {
	const slides = document.querySelectorAll('.slide');
	const btnLeft = document.querySelector('.slider-btn-left');
	const btnRight = document.querySelector('.slider-btn-right');
	const dotContainer = document.querySelector('.dots') || undefined;

	let curSlide = 0;
	const maxSlide = slides.length;

	const createDots = function () {
		dotContainer &&
			slides.forEach(function (_, i) {
				dotContainer.insertAdjacentHTML('beforeend', `<button class='dot' data-slide='${i}'></button>`);
			});
		return;
	};
	createDots();

	const activateDot = function (slide) {
		dotContainer && document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('dot-active'));

		dotContainer && document.querySelector(`.dot[data-slide='${slide}']`).classList.add('dot-active');
	};

	const goToSlide = function (slide) {
		slides.forEach((s, i) => {
			s.style.transform = `translateX(${100 * (i - slide)}%)`;
		});
	};

	goToSlide(0);
	activateDot(0);

	const nextSlide = function () {
		if (curSlide === maxSlide - 1) {
			curSlide = 0;
		} else {
			curSlide++;
		}

		goToSlide(curSlide);
		activateDot(curSlide);
	};

	const prevSlide = function () {
		if (curSlide === 0) {
			curSlide = maxSlide - 1;
		} else {
			curSlide--;
		}

		goToSlide(curSlide);
		dotContainer && activateDot(curSlide);
	};

	btnRight && btnRight.addEventListener('click', nextSlide);
	btnRight && btnLeft.addEventListener('click', prevSlide);

	document.addEventListener('keydown', e => {
		if (e.key === 'ArrowLeft') prevSlide();
		if (e.key === 'ArrowRight') nextSlide();
	});

	dotContainer.addEventListener('click', e => {
		if (e.target.classList.contains('dot')) {
			const {slide} = e.target.dataset;
			curSlide = Number(slide);
			goToSlide(slide);
			activateDot(slide);
		}
	});
}

// Define an async function to fetch data
async function fetchReviews() {
	try {
		const response = await fetch(`https://places.googleapis.com/v1/places/ChIJkRz5KHAzK4gRcCwil2IGT8o?fields=id,displayName,reviews,userRatingCount&key=${KEY}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json(); // Parse the JSON response once the promise is resolved

		data.reviews
			.filter(review => review.originalText.text.split(' ').length < 275)
			.forEach(review => {
				let newLiHTML = `
        <li class='slide absolute transition-transform duration-1000 flex flex-col mb-4 h-auto overflow-scroll justify-center items-center mt-4 '>
          <div class='wrapper'>
            <div class='flex items-center'>
              <a class='mr-4' href="${review.authorAttribution.uri}"><img width=50 height=50 src=${review.authorAttribution.photoUri} alt="user-icon" /></a>
              <div>
                <a class='text-dark font-extrabold' href=${review.authorAttribution.uri}>${review.authorAttribution.displayName}</a>
                <a class='text-subtitle text-sm block' href="${review.authorAttribution.uri}">${review.relativePublishTimeDescription}</a>
              </div>
              <a class='ml-auto' href="${review.authorAttribution.uri}"><img width=30 height=30 src="./assets/google.png" alt="" /></a>
            </div>
            <img width=150 class='my-2' src="./assets/stars.png" alt="" />
            <p class='mb-4'>
              ${review.originalText.text}
            </p>
            <button class='w-full bg-blue-100 text-blue-700 font-extrabold rounded-md py-2'><a href="https://www.google.com/search?q=physiothenix&rlz=1C1CHBF_enCA879CA879&oq=physiothenix&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTINCAEQABiDARixAxiABDIKCAIQABixAxiABDIQCAMQLhiDARixAxiABBiKBTIHCAQQLhiABDINCAUQABiDARixAxiABDIGCAYQRRg9MgYIBxBFGDzSAQgxMDgxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#">See more reviews</a></button>
          </div>
        </li>
        `;
				reviewList.insertAdjacentHTML('beforeend', newLiHTML);
			});

		setupCarousel(); // Ensure this is called after fetching and processing the data
	} catch (error) {
		console.error('There has been a problem with your fetch operation:', error);
	}
}

// Call the async function to fetch reviews
fetchReviews();

setupCarousel();

function Menu(e) {
	let list = document.querySelector('ul');
	e.name === 'menu' ? ((e.name = 'close'), list.classList.add('opacity-100')) : ((e.name = 'menu'), list.classList.remove('opacity-100'));
}
