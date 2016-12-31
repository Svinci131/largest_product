$('.js-count').on('click', function () {
	let air = $('#air').text()
	$('#air').text(air - 1)
});

(function() {
	const count = $('.js-count');
	const incr = $('.js-increase');
	const decr = $('.js-decrease');
	const reset = $('.js-reset');
	const roll = $('.js-roll');
	const clear = $('.js-clear')

	function updateCount(el, mode = 0) {
		const action = (num = 1) => {
			let curr = parseInt(el.text(), 10);
			num = num - curr % num;

			if (mode === 0) {
				curr += num;
			}
			else if (mode === 1) {
				curr -= num;
			}
			else {
				curr = 0;
			}

			el.text(curr);
		};

		const dblclick = () => action(5);

		const click = () => action();

		return {
			dblclick,
			click,
		}
	}

	function bindEvts(elToBind, mode) {
		const evt = updateCount(count, mode);
		const mc = new Hammer(elToBind.get(0));
		mc.on('tap', evt.click);
		mc.on('press', evt.dblclick)
	}

	function generateRandomNumberFromRange( s, e ) {
	    const random = s + Math.floor( Math.random() * (e-s+1) );
	    return random;
	}

	roll.click((e) => {
		const die = $(e.currentTarget).prev();

		const random = generateRandomNumberFromRange(1,3);
		const random2 = generateRandomNumberFromRange(1,3);
		die.text(random + random2)
	});

	clear.click((e) => {
		const die = $(e.currentTarget).prev().prev().prev();

		
		die.text('--')
	})

	bindEvts(incr, 0);
	bindEvts(decr, 1);
	bindEvts(reset, -1);
})();

