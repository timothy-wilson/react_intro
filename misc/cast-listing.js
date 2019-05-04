function updateCastListing() {
  // Used this to scrape cast information from Wikipedia
  let title = $('#firstHeading i').text();
  let castListingULs = $('.cast-listing');
  castListingULs.each((ignored, castListingUL) => {
    $(castListingUL).children().each((ignored, element) => {
      let character = $(element).children().length > 1 ? $(element).children()[1].text : "";
      let actor = $(element).children().length > 0 ? $(element).children()[0].text : "";
      let fullDescription = $(element).text();
      let description = fullDescription.substring(fullDescription.indexOf(',') + 2);
      let storedCharacter = completeCastListing[character];
      if (storedCharacter) {
        storedCharacter.movies.push(title);
        if (storedCharacter.actors.indexOf(actor) === -1){
          storedCharacter.actors.push(actor);
        }
        storedCharacter.description = description;
      } else {
        completeCastListing[character] = {
          actors: [actor], 
          description: description,
          movies: [title]
        };
      }
    });
  });
}

updateCastListing()
JSON.stringify(completeCastListing);