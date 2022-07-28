import axios from "axios";
const URL_CRYP ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=UAH&order=market_cap_desc&per_page=1&page=1&sparkline=false';

export async function reqCurrencyBTC () {
    let currency = null;
    await axios.get(URL_CRYP).then(res => {
        currency = res.data[0].current_price
    })
        .catch(error => {
            console.log(error);
        });

    return currency;
}