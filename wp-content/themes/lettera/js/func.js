(function() {
	var frame = document.querySelector('.content__frame');
	var ruler = document.querySelector('.ruler');
	var blacklist_rulers = ['chevron', 'selectboxes', 'radiobuttons', 'checkboxes', 'inputs', 'buttons', 'headers'];
	var breakpoints = {
		auto: '160', //auto
		xxs: '320',
		xs: '414',
		s: '480',
		m: '768',
		l: '1024',
		xl: '1100',
		xxl: '1200',
		xxxl: '1380',
		xxxxl: '1440'
	}

	function openPage(item) {
		var page = item.getAttribute('href').substring('1');
		frame.classList.add('content__frame--loading');
		frame.setAttribute('src', 'includes/' + page + '.php');

		var item_levels = item.hash.substr(1).split('.');
		document.getElementsByClassName("content__frame")[0].removeAttribute("style");
		if ((blacklist_rulers.indexOf(item_levels[1]) !== -1) || (typeof(item_levels[1]) == 'undefined') ) {
			document.getElementsByClassName("ruler")[0].style.display = "none";
			if (item_levels[0] == 'calypso') {
				document.getElementsByClassName("content__frame")[0].setAttribute("style", "width: 100%; margin: 0;")
			}
		} else {
			document.getElementsByClassName("ruler")[0].removeAttribute("style");
		}
	}

	function setFrameWidth(w) {
		frame.style.width = w >= 320 ? w + 'px' : null;
	}

	function initRuler() {
		var i, len, div, lastWidth = -20;
		for (i in breakpoints) {
			div = document.createElement('div');
			div.innerHTML = (breakpoints[i] >= 320 ? breakpoints[i] : 'Auto');
			div.className = 'ruler__button';
			div.style.width = parseInt(breakpoints[i]) - lastWidth + 'px';
			div.addEventListener('click', (function(w) {return function() {
				setFrameWidth(w);
				this.parentNode.querySelector('.ruler__button--active').classList.remove('ruler__button--active');
				this.classList.add('ruler__button--active');
			}})(breakpoints[i]));
			ruler.appendChild(div);

			lastWidth = parseInt(breakpoints[i]);
		}
		ruler.firstChild.classList.add('ruler__button--active');
	}

	function init() {
		initRuler();

		window.addEventListener('message', function(e) {
			try {
				var data = JSON.parse(e.data);
				if (data.method == 'frameHeight') {
					frame.style.height = data.data + 'px';
				}
			}
			catch (e) {}
		});

	}
	init();
})();