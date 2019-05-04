Object.keys(characterData).map(function (key) {
  // Adding new fields with default values to a dictionary object
  characterData[key].isVillian = false;
  characterData[key].isHero = false;
});
