function loadAtms() {
	var list = document.getElementById('atm-list');
	list.innerHTML = '';
	for (var i=0; i < atms.length; i++) {
		var atm = atms[i];
		var row = createElement('div');
		row.className = 'row';
		row.appendChild(createElement('div', atm.bank));
		row.appendChild(createElement('div', atm.location));
		row.appendChild(createElement('div', atm.address));
		row.appendChild(createElement('div', atm.zipCode + ' ' + atm.city));
		list.appendChild(row);
	}
}


function createElement(tag, content, attributes) {
	attributes = attributes || {};
	var el = document.createElement(tag);
	for (var a in attributes) {
		el.setAttribute(a, attributes[a]);
	}
	if (content) {
		el.appendChild(document.createTextNode(content));
	}
	return el;
}

document.addEventListener('DOMContentLoaded', loadAtms);