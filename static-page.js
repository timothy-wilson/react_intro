function selectionChangehandler(elementClicked) {
  let classNameOfItemSelected = elementClicked.target.className;
  $('.character-selected').removeClass('character-selected');
  $(`.${classNameOfItemSelected}`).addClass('character-selected');

  let characterSelected = classNameOfItemSelected.substring(0, classNameOfItemSelected.indexOf('-selector'));
  console.log('selection changed to: ' + characterSelected);

  changeDetailsShown(characterSelected);
}

function changeDetailsShown(characterSelected) {
  let currentSelectionDetails = $('.character-details');
  currentSelectionDetails.removeClass('character-details');
  currentSelectionDetails.addClass('character-details-hidden');

  let detailsSelector = `.${characterSelected}-details`;
  let newSelectionDetails = $(detailsSelector);
  newSelectionDetails.removeClass('character-details-hidden');
  newSelectionDetails.addClass('character-details');
}

$(document).ready(function() {
  $(".character-listing li").on("click", selectionChangehandler);
});