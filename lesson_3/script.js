const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
	constructor(product_name, price) {
		this.product_name = product_name;
 		this.price = price;
}
	render() {
		return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price} руб.</p><button class="button-buy">Купить</button></div>`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
	}
	fetchGoods(cb) {
		makeGETRequest(`${API_URL}/catalogData.json`)
		.then( goods => {
			this.goods = JSON.parse(goods);
			cb();
		})
		.catch( error => alert (error) )
		
	}
	render() {
		let listHtml = '';
		this.goods.forEach(good => {
		const goodItem = new GoodsItem(good.product_name, good.price);
		listHtml += goodItem.render();
	});
	document.querySelector('.goods-list').innerHTML = listHtml;
	}
	sumGoodsList() {
		let sum = 0;
		this.goods.forEach(good => {
		const goodItem = new GoodsItem(good.price);
		sum += good.price;
	});
		return sum;
	}
}

const list = new GoodsList();
list.fetchGoods(() => {
	list.render();
});


function makeGETRequest(url) {
	return new Promise( function (resolve, reject) {
		let random = Math.random();
		console.log(random);
		if ( random >= 0.6 ) {
			var xhr;

			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else if (window.ActiveXObject) { 
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}

		xhr.open('GET', url, true);
		xhr.send();

		xhr.onload = function() {
			if (xhr.status === 200) {
				resolve(xhr.response);
			} else {
				var error = new Error(xhr.statusText);
				error.code = xhr.status;
				reject(error);
			}
    	};

		xhr.onerror = function() {
			reject(new Error('Network Error'));
		};


		} else {
				setTimeout( function() {
					reject('Загружается, подождите...')
				}, 3000 );
			}
		
	});	
}

