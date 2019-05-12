let url = "https://swapi.co/api/people/?format=json"

export async function buildDict() {
    try {
        let fullData = {};
        while(url != null) {
            let response = await fetch(url);
            let partData = await response.json();
            partData.results.forEach(element => {
                fullData[element.name] = element;
            });
            url = partData.next;
        }
        return(fullData)
    } catch(err) {
        console.log(err);
    }
}

export var characterDataListing = buildDict();