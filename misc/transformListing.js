function dictionaryToArray(sourceDictionary) {
  let listAsArray = [];
  Object.keys(sourceDictionary).forEach((key) => {
    let newElement = sourceDictionary[key];
    newElement.name = key;
    listAsArray.push(newElement);
  });
  return listAsArray;
}

function characterCompare(a, b){
  if (a.name > b.name) return 1;
  if (b.name > a.name) return -1;
  return 0;
}

function arrayToDictionary(sourceArray) {
  let result = {};
  sourceArray.forEach((element) => {
    result[element.name] = element;
    delete element.name;
  });
  return result;
}
