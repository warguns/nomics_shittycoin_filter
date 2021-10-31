

const apiKey = "{add-your-nomics-api-here}";

const shitCoinableWords = [
    'Inu ',
    ' Inu',
    'Inu',
    'Shib',
    'Elon',
    'Musk',
    'Doge',
    'Baby',
    'Yoda',
    'Floki',
    'Rick',
    'ADA',
    'Eth',
    'Sexy',
    'Zilla',
    'Army',
    'Squid',
    'Pickle'
];

let total = [];
let noShitties = [];

const regexMounter = `/${shitCoinableWords.join("|")}/gi`;

async function cleanTheShit() {
    for (let i = 1; i <= 100; i++) {
        await require('axios')
            .get(`https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&filter=any&interval=7d&convert=USD&status=active&per-page=100&page=${i}`)
            .then(response => {
                if (response.data.length > 0) {
                    console.log('total intent: ' + response.data.length);
                    total = total.concat(response.data);
                    noShitties = noShitties.concat(response.data.filter((coin) => {
                        return !coin.name.match(regexMounter)
                            && parseFloat(coin['7d'].volume) >= 1000000
                            && parseFloat(coin['7d'].volume) <= 100000000
                            && parseFloat(coin.circulating_supply) >= 1000000
                            && parseFloat(coin.circulating_supply) <= 100000000
                            && parseFloat(coin.market_cap) >= 10000000
                            && parseFloat(coin.market_cap) <= 50000000
                    }));
                }
            })
            .catch(error => {});
        console.log('total: ' + total.length);
        console.log('filtered: ' + noShitties.length);
    }
    console.log(noShitties);
}

cleanTheShit();




