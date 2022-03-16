const ctx = document.getElementById('myChart');

$(document).ready(async function(){
    var loader = document.querySelector('.loader-container');
    let url = 'https://api.currencyapi.com/v3/convert?apikey=5d173b10-7911-11ec-b83e-efbbd017dc52&date=2022-03-15&value=1&currencies=INR';
    let response1 = await fetch(url);
    let data1 = await response1.json();
    let rate = data1.data.INR.value;
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('uuid');
    fetch('http://127.0.0.1:5000/getcoindetail?uuid='+myParam,{
        method: 'GET',
    }).then(function(response){
        return response.json();
    }).then(async function(data) {
        loader.style.display = 'none';
        let img, name, price, change, alltimehigh, dateofAlltimehigh, marketCap, website, description;
        img = document.getElementById('coinIcon');
        name = document.getElementById('name');
        price = document.getElementById('price');
        change = document.getElementById('current-situation');
        description = document.getElementById('description');
        alltimehigh = document.getElementById('all-time-high');
        dateofAlltimehigh = document.getElementById('all-time-high-timestamp');
        marketCap = document.getElementById('market-cap');
        website = document.getElementById('website');
        img.setAttribute('src', data.iconUrl);
        name.innerHTML = data.name + " - " + data.symbol;
        name.style.color = data.color;
        price.style.color = data.color;
        price.innerHTML = '&#8377; ' + (Number.parseFloat(data.price) * rate);
        if(Number.parseFloat(data.change) < 0){
            change.innerHTML = '&#9660; ' + data.change;
            change.style.color = 'red';
        }
        else{
            change.innerHTML = '&#9650; ' + data.change;
            change.style.color = 'green';
        }
        alltimehigh.innerHTML = 'All time high: &#8377 ' + (Number.parseFloat(data.allTimeHigh.price) * rate);
        dateofAlltimehigh.innerHTML = new Date(data.allTimeHigh.timestamp * 1000).toDateString();
        marketCap.innerHTML = 'Market Cap: &#8377 ' + (Number.parseFloat(data.marketCap) * rate);
        if(data.websiteUrl != null && data.websiteUrl != ''){
            website.innerHTML = "Website";
            website.setAttribute('href', data.websiteUrl);
        } else{
            website.style.display = 'none';
        }
        website.setAttribute('href', data.websiteUrl);
        description.innerHTML = data.description;
        let plotarray = data.sparkline.map(function(item){
            return Number.parseFloat(item)*rate;
        });
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: plotarray,
                datasets: [{
                    label: data.name,
                    backgroundColor: data.color,
                    borderColor: data.color,
                    data: plotarray,
                }]
            },
            options: {
                responsive: true,
                    transitions: {
                        show: {
                        animations: {
                            x: {
                            duration: 1000,
                            easing: 'linear',
                            from: 0
                            },
                            y: {
                            duration: 1000,
                            easing: 'linear',
                            from: 0
                            }
                        }
                        },
                        hide: {
                        animations: {
                            x: {
                            duration: 1000,
                            easing: 'linear',
                            to: 0
                            },
                            y: {
                            duration: 1000,
                            easing: 'linear',
                            to: 0
                            }
                        }
                        }
                    }
                }
        });
    });
});
