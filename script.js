const currentGoldPriceForm = document.querySelector('#currentGoldPriceForm');
const paragraphCurrentGoldPrice = document.querySelector('#currentGoldPriceParagraph');
currentGoldPriceForm.addEventListener('submit', showCurrentGoldPrice);

const currencyExchangeRateFormC = document.querySelector('#currencyExchangeRateC');
const paragraphExchangeRateDateC = document.querySelector('#currentExchangeDateParagraphC');
const currencyExchangeRatesTableC = document.querySelector('#currencyExchangeRatesTableC');
currencyExchangeRateFormC.addEventListener('submit', showBidAskExchangeRates);

const currencyExchangeRateFormA = document.querySelector('#currencyExchangeRateA');
const paragraphExchangeRateDateA = document.querySelector('#currentExchangeDateParagraphA');
const currencyExchangeRatesTableA = document.querySelector('#currencyExchangeRatesTableA');
currencyExchangeRateFormA.addEventListener('submit', showMidExchangeRatesA);

const currencyExchangeRateFormB = document.querySelector('#currencyExchangeRateB');
const paragraphExchangeRateDateB = document.querySelector('#currentExchangeDateParagraphB');
const currencyExchangeRatesTableB = document.querySelector('#currencyExchangeRatesTableB');
currencyExchangeRateFormB.addEventListener('submit', showMidExchangeRatesB);

function showCurrentGoldPrice(event) {
    event.preventDefault();

    fetch('http://api.nbp.pl/api/cenyzlota')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const goldData = data[0];
            const { data: goldDate, cena: goldPrice } = goldData;

            paragraphCurrentGoldPrice.textContent = `On the ${goldDate} the price is ${goldPrice} PLN/g.`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            paragraphCurrentGoldPrice.textContent = 'There has been an error when fetching data.';
        });
}

function showBidAskExchangeRates(event) {
    event.preventDefault();

    fetch('http://api.nbp.pl/api/exchangerates/tables/C/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tableCdata = data[0];
            const { effectiveDate: tableCDate, rates: exchangeCRates } = tableCdata;

            paragraphExchangeRateDateC.textContent = `On the ${tableCDate} the exchange rates are:`;

            while (currencyExchangeRatesTableC.rows.length > 1) {
                currencyExchangeRatesTableC.deleteRow(1);
            }

            exchangeCRates.forEach(exchangeCRatesData => {
                const { currency: currencyName, code: cureencyCode, bid: bidExchangeRate, ask: askExchangeRate} = exchangeCRatesData;
                const newRow = currencyExchangeRatesTableC.insertRow(-1);

                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                const cell3 = newRow.insertCell(2);
                const cell4 = newRow.insertCell(3);

                cell1.textContent = currencyName;
                cell2.textContent = cureencyCode;
                cell3.textContent = bidExchangeRate;
                cell4.textContent = askExchangeRate;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            paragraphExchangeRateDateC.textContent = 'There has been an error when fetching data.';
        });
}

function showMidExchangeRatesA(event) {
    event.preventDefault();

    fetch('http://api.nbp.pl/api/exchangerates/tables/A/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tableAdata = data[0];
            const { effectiveDate: tableADate, rates: exchangeARates } = tableAdata;

            paragraphExchangeRateDateA.textContent = `On the ${tableADate} the exchange rates are:`;

            while (currencyExchangeRatesTableA.rows.length > 1) {
                currencyExchangeRatesTableA.deleteRow(1);
            }

            exchangeARates.forEach(exchangeARatesData => {
                const { currency: currencyName, code: cureencyCode, mid: midExchangeRate} = exchangeARatesData;
                const newRow = currencyExchangeRatesTableA.insertRow(-1);

                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                const cell3 = newRow.insertCell(2);

                cell1.textContent = currencyName;
                cell2.textContent = cureencyCode;
                cell3.textContent = midExchangeRate;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            paragraphExchangeRateDateA.textContent = 'There has been an error when fetching data.';
        });
}

function showMidExchangeRatesB(event) {
    event.preventDefault();

    fetch('http://api.nbp.pl/api/exchangerates/tables/B/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tableBdata = data[0];
            const { effectiveDate: tableBDate, rates: exchangeBRates } = tableBdata;

            paragraphExchangeRateDateB.textContent = `On the ${tableBDate} the exchange rates are:`;

            while (currencyExchangeRatesTableB.rows.length > 1) {
                currencyExchangeRatesTableB.deleteRow(1);
            }

            exchangeBRates.forEach(exchangeBRatesData => {
                const { currency: currencyName, code: cureencyCode, mid: midExchangeRate} = exchangeBRatesData;
                const newRow = currencyExchangeRatesTableB.insertRow(-1);

                const cell1 = newRow.insertCell(0);
                const cell2 = newRow.insertCell(1);
                const cell3 = newRow.insertCell(2);

                cell1.textContent = currencyName;
                cell2.textContent = cureencyCode;
                cell3.textContent = midExchangeRate;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            paragraphExchangeRateDateB.textContent = 'There has been an error when fetching data.';
        });
}
