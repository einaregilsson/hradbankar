function el(selector) {
	return document.querySelectorId(selector);
}

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
		if (atm.distance) {
			row.appendChild(createElement('div', 'Fjarlægð: ' + atm.distanceDisplay));
		}
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

//Thank you http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	function deg2rad(deg) {
		return deg * (Math.PI/180)
	}


	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
	; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}


document.addEventListener('DOMContentLoaded', loadAtms);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        
    }
}

function readableDistance(km) {
	if (km < 1) {
		return Math.round((km*1000),0) + ' m';
	}
	if (km < 10) {
		return km.toFixed(1).toString().replace('.', ',') + ' km';
	}
	return Math.round(km,0) + ' km';
}

function showPosition(position) {

	for (var i=0; i < atms.length; i++) {
		var atm = atms[i];
		var distance = getDistanceFromLatLonInKm(
			position.coords.latitude, 
			position.coords.longitude,
			atm.coordinates.lat,
			atm.coordinates.lng);
		
		atm.distance = distance;
		atm.distanceDisplay = readableDistance(distance);
	}

	atms.sort(function(a,b) {
		return a.distance - b.distance;
	});

	loadAtms();

}
getLocation();