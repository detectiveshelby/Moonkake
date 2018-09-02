/* UTILS
-------------------------------------------------- */

var $utils = {
	hello: function () {
		console.log('Ура, вы нашли то, что искали! Хотите крутой сайт - заходите на https://devbrains.ru');
	},

	getPageQuery: function (key) {
		var query = {};

		if (window.location.search) {
			let tmp;
			var q = window.location.search;
			q = q.slice(1);
			q = q.split('&');

			for (var i = 0; i < q.length; i++) {
				tmp = q[i].split('=');
				query[tmp[0]] = decodeURIComponent(tmp[1]);
			}

			if (key) {
				return query[key];
			} else {
				return query;
			}
		}
	},

	scrollTo: function ($element, $context, offset) {
		offset = offset || 0;
		let scrollTop = 0;

		if ($context === '') {
			$context = $('html, body');
		}

		if ($context !== '') {
			$context = $($context);
			scrollTop = $context.scrollTop();
		}

		$context.stop().animate({
			scrollTop: $element.offset().top + scrollTop - offset
		}, 500, function () {
			$(document).trigger('scrollToAfterScroll', {
				element: $element
			});
		});
	},

	getSection: function ($element, $context, offset) {
		let $item = 0;
		let scrollTop = 0;

		if ($context === '') {
			$context = $(document);
		}

		if ($context !== '') {
			$context = $($context);
			scrollTop = $context.scrollTop();
		}

		$element.each(function () {
			var $self = $(this);

			if ($context.scrollTop() >= $self.offset().top + scrollTop - offset) {
				$item = $self;
			}
		});

		return $item;
	},

	numberFormat: function (number, decimals, dec_point, thousands_sep) {
		var i, j, kw, kd, km;

		if (isNaN(decimals = Math.abs(decimals))) {
			decimals = 2;
		}
		if (dec_point === undefined) {
			dec_point = ',';
		}
		if (thousands_sep === undefined) {
			thousands_sep = '.';
		}

		i = parseInt(number = (+number || 0).toFixed(decimals)) + '';

		if ((j = i.length) > 3) {
			j = j % 3;
		} else {
			j = 0;
		}

		km = j ?
			i.substr(0, j) + thousands_sep :
			'';
		kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
		kd = (decimals ?
			dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, '0').slice(2) :
			'');

		return km + kw + kd;
	},

	isTouchDevice: function() {
		var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
		var mq = function(query) {
			return window.matchMedia(query).matches;
		}

		if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
			return true;
		}

		var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
		return mq(query);
	}
};

$utils.hello();
