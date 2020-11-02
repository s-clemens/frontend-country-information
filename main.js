
//HTML element link and event initializers for use of the Search and Enter button
const searchButton = document.getElementById('search-button');
const errorMessage = document.getElementById('warning');
const userCountryInput = document.getElementById('country-entry');
const resultBox = document.getElementById('result');
const flagImage = document.getElementById('flag-image');
const countryTitle = document.getElementById('country-title');

// Event function on click of searchbuttong
searchButton.addEventListener('click', searchCountry);

// Event function to prevent default <form> event when pressing enter.
userCountryInput.addEventListener("keypress", function(e){
    if (e.keyCode === 13){
        e.preventDefault();
        searchCountry();
    }
});


// Function for searching the country and return the results to HTML
async function searchCountry(){

    try {
        // Get result from API rest Countries by user input.
        const result = await axios.get('https://restcountries.eu/rest/v2/name/' + userCountryInput.value + '?fullText=true');

        const { name,
        subregion,
        population,
        capital,
        flag,
        languages,
        currencies
        } = result.data[0];

        // Empty user input box.
        userCountryInput.value = "";

        // Empty warning box.
        errorMessage.textContent = "";

        // Set's source of image and text for head of results
        flagImage.src = flag;
        countryTitle.textContent = name;

        resultBox.textContent= name + " is situated in " + subregion + ".\r\n" +
            "It has a population of " + population + " people." +
            "The capital is " + capital + getCurrencies(currencies) +
            getLanguages(languages);

        console.log(languages);

    } catch (err){
        errorMessage.textContent = "Please fill in a valid country name.";
    }

}

// Function to write a conditional string for the currencies used in a country with for-loops.
function getCurrencies(currencies){
    let currencyResult = " and you can pay with ";

    if(currencies.length === 1){
        return currencyResult + currencies[0].name + "'s.";
    }
    if(currencies.length === 2){
        for (let i = 0; i < currencies.length; i++) {
            currencyResult += currencies[i].name;
            if(i !== currencies.length - 1){
                currencyResult += "'s and ";
            }else{
                currencyResult += ".";
            }
        }
        return currencyResult;
    }
    if(currencies.length > 2){
        for (let i = 0; i < currencies.length; i++) {
            currencyResult += currencies[i].name;
            if(i < currencies.length - 1){
                currencyResult += "'s, ";
            } else if(i === currencies.length - 1){
                currencyResult += "'s and ";
            } else {
                currencyResult += ".";
            }
        }
        return currencyResult;
    }
}

// function to write a conditional string for the languages used in a country with the reduce function.
function getLanguages(languages){
    let languageString = languages.reduce((acc, languageIteration) => {
        return acc + `${languageIteration.name}, `;
    }, "They speak ")

    // Haal de laatste komma weg en zet er een punt achter
    languageString = languageString.substring(0, languageString.length - 2) + ".";

    // Haal de index van de laatste overgebleven komma, als deze er is.
    const index = languageString.lastIndexOf(",");

    // Als er nog komma's over zijn
    if (index > 0) {
        languageString = languageString.substring(0, index) + " en" + languageString.substring(index + 1);
    }



    return languageString;
}

