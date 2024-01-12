$(document).ready(function(){
	// Initialize an empty object to store selected empty
	let selectedAmenities = {};

	//Listen for changes on each inpur checkbox
	$('input[type="checkbox"]').change(function(){
		// Get the amenity ID and name from the data atributes
		let amenityID = $(this).data('id');
		let amenityName = $(this).data('name');

		// check if the checkboc is checked
		if ($(this).prop('checked')){
			selectedAmenities[amenityID] = amenityName;
		} else {
			delete selectedAmenities[amenityID];
		}
		
		// Update the h4 tag inside the div Amenities with the list of Amenities checked
		$('.amenities H4').text(Object.values(selectedAmenities).join(', '));
	});
})