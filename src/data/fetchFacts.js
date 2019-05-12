let url = "https://swapi.co/api/people/?format=json"

export async function buildDict() {
    try {
        console.log('buildDict called');
        let fullData = {};
        while(url != null) {
            let response = await fetch(url);
            let partData = await response.json();
            partData.results.forEach(element => {
                fullData[element.name] = element;
            });
            url = partData.next;
        }
        console.log('buildDict returning data');
        return(fullData)
    } catch(err) {
        console.log(err);
    }
}
