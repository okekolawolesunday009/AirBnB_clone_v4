

$(document).ready(function(){
	// Initialize an empty object to store selected empty
	let selectedAmenities = {};
	let selectedCities = {};
	let selectedStateIds = [];
	

	//Listen for changes on each inpur checkbox
	$('input[type="checkbox"].city').change(function(){
		updateFilter(this, selectedAmenities, 'locations')
		let stateID = $(this).closest('li')
		console.log(stateID)

		if ($(this).prop('checked')) {
			selectedStateIds.push(stateID);
		} else {
			selectedStateIds = selectedStateIds.filter(id => id !== stateID);
		}
		// Get the amenity ID and name from the data atributes
		// let amenityID = $(this).data('id');
		// let amenityName = $(this).data('name');

		// check if the checkbox is checked
		// if ($(this).prop('checked')){
		// 	selectedAmenities[amenityID] = amenityName;
		// } else {
		// 	delete selectedAmenities[amenityID];
		// }
		
		// Update the h4 tag inside the div Amenities with the list of Amenities checked
		// let selectedAmenitiesArray = Object.values(selectedAmenities);
		// $('.amenities h4').text(selectedAmenitiesArray.length > 2 ? selectedAmenitiesArray.slice(0, 2).join(', ') + '...' :  selectedAmenitiesArray.join(', '))
	});

	$('input[type="checkbox"].amenity').change(function(){
		updateFilter(this, selectedCities, 'amenities');
	});
	
	$('.filter_button').click(function() {
		$.ajax({
			url: 'http://0.0.0.0:5001/api/v1/places_search/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				amenities: Object.keys(selectedAmenities),
				cities: Object.keys(selectedCities),
				states: selectedStateIds
			}),
			success: function(data) {
				
				const placeSection = $('.places');
				$.each(data, function(index, place){
					const article = $('<article>');
					article.html(`
						<div class="title_box">
							<h2>${place.name}</h2>
							<div class="price_by_night">$${place.price_by_night}</div>
						</div>
						<div class="information">
							<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
							<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
							<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
						</div>
						<div class="user">
							<b>Owner:</b> ${place.user_id.first_name} ${place.user_id.last_name}
						</div>
						<div class="description">
							${place.description}
						</div>
					`);
					placeSection.append(article)
				});
			},
			error: function(error) {
				console.error("Error fetching: ", error)
			}
			})
	})

	const updateFilter = (checkbox, selectedFilter, FilterType)=>{
		let FilterID = $(checkbox).data('id');
		let filterName = $(checkbox).data('name')

		// check if the checkbox is checked
		if ($(checkbox).prop('checked')) {
			selectedFilter[FilterID] = filterName;
		} else {
			delete selectedFilter[FilterID];
		}

		// Update the h4 tag inside the div Locations with the list of selected filters
		let selectedFilterArray = Object.values(selectedFilter);

		
		$(`.${FilterType} h4`).text(selectedFilterArray.length > 2 ? selectedFilterArray.slice(0, 2).join(', ') + '...' :  selectedFilterArray.join(', '));
	}
});