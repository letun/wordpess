'use strict';

(function() {
	var frame = document.querySelector('.content__frame');
	var ruler = document.querySelector('.ruler');
	var breakpoints = [
		{ size: '320px', title: 'Mobile S' },
		{ size: '375px', title: 'Mobile M' },
		{ size: '425px', title: 'Mobile L' },
		{ size: '768px', title: 'Tablet S' },
		{ size: '1024px', title: 'Tablet M' },
		{ size: '1100px', title: 'Tablet L' },
		{ size: '1200px', title: 'Laptop S' },
		{ size: '1380px', title: 'Laptop M' },
		{ size: '1440px', title: 'Laptop L' },
		{ size: '100%', title: 'Auto'}
	];

	function setFrameWidth(w) {
		frame.style.width = w >= 320 ? w + 'px' : null;
	}

	function initRuler() {
		var div;
		var i;

		for (i = breakpoints.length - 1; i > -1; i--) {
			div = document.createElement('div');
			div.setAttribute('data-title', breakpoints[i].title + ' - ' + breakpoints[i].size);
			div.className = 'ruler__button';
			div.style.width = breakpoints[i].size;

			div.addEventListener('click', (function(w) {return function() {
				setFrameWidth(w);
				this.parentNode.querySelector('.ruler__button--active').innerHTML = '';
				this.parentNode.querySelector('.ruler__button--active').classList.remove('ruler__button--active');
				this.classList.add('ruler__button--active');
			}})(breakpoints[i].size));

			div.addEventListener('mouseenter', (function(w) {return function() {
				this.parentNode.lastChild.innerHTML = this.getAttribute('data-title');
			}})(breakpoints[i].size));
			div.addEventListener('mouseleave', (function(w) {return function() {
				this.parentNode.lastChild.innerHTML = this.parentNode.querySelector('.ruler__button--active').getAttribute('data-title');
			}})(breakpoints[i].size));

			ruler.appendChild(div);
		}

		if (ruler.firstChild) {
			ruler.firstChild.classList.add('ruler__button--active');
			ruler.lastChild.innerHTML = ruler.firstChild.getAttribute('data-title');
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