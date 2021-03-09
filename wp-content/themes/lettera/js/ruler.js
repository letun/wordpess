'use strict';

(function() {
	var frame = document.querySelector('.content');
	var screenLines = document.querySelector('.ruler__screens-line');
	var devices = document.querySelector('.ruler__buttons-group--devices');
	var breakpoints = [
		{ name: 'mobile-s', size: '320px', title: 'Mobile S' },
		{ name: 'mobile-m', size: '375px', title: 'Mobile M' },
		{ name: 'mobile-l', size: '425px', title: 'Mobile L' },
		{ name: 'tablet-s', size: '768px', title: 'Tablet S' },
		{ name: 'tablet-m', size: '1024px', title: 'Tablet M' },
		{ name: 'tablet-l', size: '1100px', title: 'Tablet L' },
		{ name: 'laptop-s', size: '1200px', title: 'Laptop S' },
		{ name: 'laptop-m', size: '1280px', title: 'Laptop M' },
		{ name: 'laptop-l', size: '1440px', title: 'Laptop L' },
		{ name: 'auto', size: '100%', title: 'Auto'}
	];

	function setFrameWidth(w) {
		frame.style.width = w;
	}

	function initRuler() {
		var div;
		var i;

		for (i = breakpoints.length - 1; i > -1; i--) {
			div = document.createElement('div');
			div.setAttribute('data-title', breakpoints[i].title + ' - ' + breakpoints[i].size);
			div.setAttribute('data-name', breakpoints[i].name);
			div.className = 'ruler__screen-button';
			div.style.width = breakpoints[i].size;

			div.addEventListener('click', (function(w) {return function() {
				setFrameWidth(w);
				if (this.parentNode.querySelector('.ruler__screen-button--active')) {
					this.parentNode.querySelector('.ruler__screen-button--active').innerHTML = '';
					this.parentNode.querySelector('.ruler__screen-button--active').classList.remove('ruler__screen-button--active');
					this.classList.add('ruler__screen-button--active');
				}

				devices.querySelectorAll('.ruler__button').forEach(function(el) {
					el.classList.remove('ruler__button--active');
				});
				if (devices.querySelector('.ruler__button[data-name=' + this.getAttribute('data-name') + ']')) {
					devices.querySelector('.ruler__button[data-name=' + this.getAttribute('data-name') + ']').classList.add('ruler__button--active');
				}
			}})(breakpoints[i].size));

			div.addEventListener('mouseenter', (function(w) {return function() {
				this.parentNode.lastChild.innerHTML = this.getAttribute('data-title');
			}})(breakpoints[i].size));
			div.addEventListener('mouseleave', (function(w) {return function() {
				if (this.parentNode.querySelector('.ruler__screen-button--active')) {
					this.parentNode.lastChild.innerHTML = this.parentNode.querySelector('.ruler__screen-button--active').getAttribute('data-title');
				}
			}})(breakpoints[i].size));

			screenLines.appendChild(div);
		}

		//Add mouse click to devices
		devices.querySelectorAll('.ruler__button').forEach(function(el) {
			el.addEventListener('click', (function(w) {return function() {
				// Remove active class
				screenLines.querySelectorAll('.ruler__screen-button').forEach(function(el) {
					el.classList.remove('ruler__screen-button--active');
				});

				// Select element
				if (screenLines.querySelector('.ruler__screen-button[data-name=' + w + ']')) {
					screenLines.querySelector('.ruler__screen-button[data-name=' + w + ']').classList.add('ruler__screen-button--active');
					screenLines.querySelector('.ruler__screen-button[data-name=' + w + ']').click();
				}
			}})(el.getAttribute('data-name')));
		});

		if (screenLines.firstChild) {
			screenLines.firstChild.classList.add('ruler__screen-button--active');
			screenLines.lastChild.innerHTML = screenLines.firstChild.getAttribute('data-title');
		}
	}

	function init() {
		initRuler();

		window.addEventListener('message', function(e) {
			try {
				var data = JSON.parse(e.data);
				if (data.method === 'frameHeight') {
					frame.style.height = data.data + 'px';
				}
			}
			catch (e) {}
		});

	}
	init();
})();