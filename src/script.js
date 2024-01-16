const menu = document.querySelector('#menu');
const hamburger = document.querySelector('#hamburger-button');

function onToggleMenu(e) {
	e.name;
}

hamburger.addEventListener('click', e => {
	menu.classList.toggle('hide');
	console.log('test');
});
