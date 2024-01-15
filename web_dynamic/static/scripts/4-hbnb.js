$(document).ready(function(){
	// Initialize an empty object to store selected empty
	let selectedAmenities = {};

	//Listen for changes on each inpur checkbox
	$('input[type="checkbox"]').change(function(){
		// Get the amenity ID and name from the data atributes
		let amenityID = $(this).data('id');
		let amenityName = $(this).data('name');

		// check if the checkbox is checked
		if ($(this).prop('checked')){
			selectedAmenities[amenityID] = amenityName;
		} else {
			delete selectedAmenities[amenityID];
		}
		
		// Update the h4 tag inside the div Amenities with the list of Amenities checked
		let selectedAmenitiesArray = Object.values(selectedAmenities);
		$('.amenities h4').text(selectedAmenitiesArray.length > 2 ? selectedAmenitiesArray.slice(0, 2).join(', ') + '...' :  selectedAmenitiesArray.join(', '))
		console.log(selectedAmenitiesArray)
	});
	
	$('.filter_button').click(function() {
		$.ajax({
			url: 'http://0.0.0.0:5001/api/v1/places_search/',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				amenities: Object.keys(selectedAmenities)
			}),
			success: function(data) {
				console.log(data)
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
})