//text a company name in the input-->if name==data.match.name-->symbol-->display all the data



document.addEventListener('DOMContentLoaded', () => {
    //colors
    const red = '#932525'
    const green = '#3F611E'
    const yellow = '#D5B74C'
        //declaring vars
    let symbol = '';
    let name = '';
    let minimum = '';
    let maximum = '';
    let dataset = [];
    let dataset1 = [];
    let dataset2 = [];
    let color = '';
    //get dates
    let today = new Date()
    let dd0 = String(today.getDate() - 1).padStart(2, '0');
    
    let yyyy0 = today.getFullYear() - 1;
    let ddsAgo = String(today.getDate() - 7).padStart(2, '0');
    let dZeroDay = '30';
    let yyyy = today.getFullYear();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth()).padStart(2, '0'); //ianuarie=0
    let mm0 = String(today.getMonth() + 1).padStart(2, '0'); //ianuarie=0
    yesterday = yyyy + '-' + mm0 + '-' + dd0;

    yearAgo = yyyy0 + '-' + mm0 + '-' + dd;
    if (ddsAgo === '00') {
        daysAgo = yyyy + '-' + mm + '-' + dZeroDay;
    } else {
        daysAgo = yyyy + '-' + mm0 + '-' + ddsAgo;
    }

    if(mm0=='01'){
       monthAgo = yyyy0 + '-' +'12' + '-' + dd;
    }
    else{
        monthAgo = yyyy + '-' + mm0 + '-' + dd;

    }

console.log('yesterday:'+yesterday)
console.log('monthAgo:'+monthAgo)
console.log('yearAgo:'+yearAgo)
console.log('ddsAgo:'+ddsAgo)
console.log('dzero:'+dZeroDay)
console.log('mm:'+mm)
console.log('mm0:'+mm0)
console.log('dayAgp:'+daysAgo)


    //short nums

    const shorterNums = (value) => {
        var suff = ['', 'K', 'M', 'B', 'T']
        var suffNum = Math.floor(("" + value).length / 3)
        var shortVal = parseFloat((suffNum != 0 ? (value / Math.pow(1000, suffNum)) : value).toPrecision(2))
        if (shortVal % 1 != 0) {
            shortVal = shortVal.toFixed(4)
        }
        return shortVal + suff[suffNum]
    }

    //lsteners
    document.getElementById('search').addEventListener('keyup', (ev) => {
        name = ev.target.value
        document.querySelector('.sorry').style.display = "none"

    })
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        getName();
        document.querySelector('.suggestions').style.display = "block"
        document.querySelector('.general-info').style.display = "none"
        document.querySelector('.company-overview').style.display = "none"
        document.querySelector('.cashflow').style.display = "none"
        document.querySelector('.news').style.display = "none"
        document.querySelector('.myChart1').style.display = 'none'
        document.querySelector('.myChart2').style.display = 'none'
        document.getElementById('bell').style.display = 'none'
        document.getElementById('bell').style.display = 'none'


    })
    document.getElementById('more-info-button').addEventListener('click', () => {
        document.querySelector('.more-info').style.display = 'none'
        document.querySelector('.less-info').style.display = 'block'
        document.querySelector('.myChart1').style.display = 'block'
        document.querySelector('.myChart2').style.display = 'block'

    })
    document.getElementById('less-info-button').addEventListener('click', () => {
        document.querySelector('.less-info').style.display = 'none'
        document.querySelector('.more-info').style.display = 'block'
        document.querySelector('.myChart1').style.display = 'none'
        document.querySelector('.myChart2').style.display = 'none'

    })

    document.getElementById('bell').addEventListener('click', () => {
        document.querySelector('.balance-sheet').style.transform = 'scaleX(1)';
        document.getElementById('bell').style.display = 'none'
        document.getElementById('close').style.display = 'block'
    })
    document.getElementById('close').addEventListener('click', () => {
        document.querySelector('.balance-sheet').style.transform = 'scaleX(0)';
        document.getElementById('bell').style.display = 'block'
        document.getElementById('close').style.display = 'none'
    })


    function getName() {
        //search company name
        $.getJSON(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=UKOEC25JWL0ZFLQ3`,
            function(data) {
                if (data && Object.keys(data).length === 0 && Object.getPrototypeOf(data) === Object.prototype) {
                    console.log('no data')
                } else {
                    for (let i = 0; i < (data.bestMatches).length; i++) {
                        var li = document.createElement('li')
                        var btn = document.createElement('button')
                        btn.append(data.bestMatches[i]["1. symbol"])
                        btn.innerHTML = data.bestMatches[i]["4. region"] + '&#9679; &#9679; &#9679;' + data.bestMatches[i]["1. symbol"]
                        btn.setAttribute('value', data.bestMatches[i]["1. symbol"])
                        btn.setAttribute('id', i)
                        btn.classList.add('btn')
                        li.append(btn)
                        document.querySelector('.suggestions').append(li)

                        btn.onclick = function() {
                            symbol = this.value;
                            $('.suggestions').empty()
                            document.querySelector('.suggestions').style.display = "none"
                            document.querySelector('.general-info').style.display = "block"
                            document.querySelector('.company-overview').style.display = "block"
                            document.querySelector('.cashflow').style.display = "block"
                            document.querySelector('.news').style.display = "block"
                            document.getElementById('bell').style.display = 'block'

                            getDatas();


                        }
                    }
                }

            })

    }


    const getDatas = () => {

        //overview company
        $.getJSON(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=UKOEC25JWL0ZFLQ3`,
            function(data) {
                if (data && Object.keys(data).length === 0 && Object.getPrototypeOf(data === Object.prototype)) {
                    data = '';
                    document.querySelector('.general-info').style.display = "none"
                    document.querySelector('.company-overview').style.display = "none"
                    document.querySelector('.cashflow').style.display = "none"
                    document.querySelector('.news').style.display = "none"
                    document.querySelector('.myChart1').style.display = 'none'
                    document.querySelector('.myChart2').style.display = 'none'
                    document.getElementById('bell').style.display = 'none'
                    document.getElementById('bell').style.display = 'none'
                    document.querySelector('.sorry').style.display = "block"

                } else {
                    //ratios
                    $('.dps-value').text(data.DividendPerShare);
                    $('.beta-value').text(data.Beta);
                    $('.pmargin-value').text(data.ProfitMargin);
                    $('.pe-ratio').text(data.PERatio);
                    $('.pb-ratio').text(data.PriceToBookRatio);
                    $('.ps-ratio').text(data.PriceToSalesRatioTTM)
                    $('.eps-value').text(data.EPS)
                    $('.roe-ratio').text(data.ReturnOnEquityTTM)
                    $('.roa-ratio').text(data.ReturnOnAssetsTTM)
                    $('.ebitda-value').text(shorterNums(data.EBITDA))
                    $('.evtoebitda-value').text(data.EVToEBITDA)
                        //info-general
                    $('.market-cap').text(shorterNums(data.MarketCapitalization))
                    $('.name').text(data.Name)
                    $('.type').text(data.AssetType)
                    $('.exchange').text(data.Exchange)
                    $('.currency').text(data.Currency)
                    $('.country').text(data.Country)
                    $('.sector').text(data.Sector)
                    $('.industry').text(data.Industry)
                    $('.analyst-target').text(data.AnalystTargetPrice)

                    //ev to ebitda
                    const EVEBITDA = Number($('.evtoebitda-value').text())
                    if (EVEBITDA < 10) {
                        $('.evtoebitda').css('backgroundColor', green)
                    } else if (EVEBITDA < 14) {
                        $('.evtoebitda').css('backgroundColor', yellow)
                    } else {
                        $('.evtoebitda').css('backgroundColor', red)

                    }

                    //DPS value
                    const DPS = Number($('.dps-value').text())
                    if (DPS < 0.01) {
                        $('.dps').css('backgroundColor', green)
                    } else if (DPS < 0.06) {
                        $('.dps').css('backgroundColor', yellow)
                    } else {
                        $('.dps').css('backgroundColor', red)

                    }
                    //BETA value
                    const BETA = Number($('.beta-value').text())
                    if (BETA < 0.5) {
                        $('.beta').css('backgroundColor', green)
                    } else if (BETA < 0.9) {
                        $('.beta').css('backgroundColor', yellow)
                    } else {
                        $('.beta').css('backgroundColor', red)

                    }

                    //PROFIT MARGIN VALUE
                    const PMARGIN = Number($('.pmargin-value').text())
                    if (PMARGIN < 0.1) {
                        $('.pmargin').css('backgroundColor', red)
                    } else if (PMARGIN < 0.2) {
                        $('.pmargin').css('backgroundColor', yellow)
                    } else {
                        $('.pmargin').css('backgroundColor', green)

                    }

                    //PE ratio
                    const PE = Number($('.pe-ratio').text())

                    if (PE < 25) {
                        $('.pe').css('backgroundColor', green)
                    } else if (PE <= 30) {
                        $('.pe').css('backgroundColor', yellow)
                    } else {
                        $('.pe').css('backgroundColor', red)

                    }
                    //pb ratio
                    const PB = Number($('.pb-ratio').text())
                    if (PB < 10) {
                        $('.pb').css('backgroundColor', green)
                    } else if (PB < 30) {
                        $('.pb').css('backgroundColor', yellow)
                    } else {
                        $('.pb').css('backgroundColor', red)

                    }


                    //ps ratio
                    const PS = Number($('.ps-ratio').text())

                    if (PS < 1) {
                        $('.ps').css('backgroundColor', green)
                    } else if (PS > 1 && PS < 2) {
                        $('.ps').css('backgroundColor', yellow)
                    } else {
                        $('.ps').css('backgroundColor', red)

                    }

                    //EPS
                    const EPS = Number($('.eps-value').text())
                    EPS > 80 ? $('.eps').css('backgroundColor', green) : $('.eps').css('backgroundColor', red)

                    //ROE ratio
                    const ROE = Number($('.roe-ratio').text())

                    if (ROE > 0.15) {
                        $('.roe').css('backgroundColor', green)
                    } else if (ROE >= 0.10) {
                        $('.roe').css('backgroundColor', yellow)
                    }

                    //ROA
                    const ROA = Number($('.roa-ratio').text())

                    if (ROA > 0.2) {
                        $('.roa').css('backgroundColor', green)
                    } else if (ROA >= 0.1) {
                        $('.roa').css('backgroundColor', yellow)
                    } else {
                        $('.roa').css('backgroundColor', red)
                    }









                    $.getJSON(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=p5ViLMJtjypPJOx85B6Fhvpen20wqQoW`,
                        function(data) {

                            $('.price-c').text(data.results[0].c)
                            $('.price-o').text(data.results[0].o)

                        })
                    $.getJSON(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${monthAgo}/${yesterday}?adjusted=true&sort=desc&limit=120&apiKey=p5ViLMJtjypPJOx85B6Fhvpen20wqQoW`,
                        function(data) {

                            for (let i = 0; i < (data.results).length; i++) {
                                dataset.push(data.results[i].c)
                            }
                            let rep = ((data.results[0].c) / (data.results[1].c)).toFixed(2);
                            if (data.results[0].c > data.results[1].c) {
                                $('.price-c').css('color', green)
                                $('.arrow').text('  +' + rep + '%')
                                $('.arrow').css('color', green)

                            } else {
                                $('.price-c').css('color', red)
                                $('.arrow').text('  -' + rep + '%')
                                $('.arrow').css('color', red)
                            }

                            const revDataset = dataset.reverse()
                                //conditions for y axis
                            for (let x = 0; x < revDataset.length; x++) {
                                if (revDataset[0] > revDataset[revDataset.length - 1]) {
                                    maximum = revDataset[0] + (revDataset[0] / 10);
                                    minimum = revDataset[revDataset.length - 1] - revDataset[revDataset.length - 1] / 10
                                } else {
                                    minimum = revDataset[0] - (revDataset[0] / 10);
                                    maximum = revDataset[revDataset.length - 1] + revDataset[revDataset.length - 1] / 10
                                }

                            }
                            //color
                            if (revDataset[0] > revDataset[revDataset.length - 1]) {
                                color = red
                            } else {
                                color = green
                            }

                            const ctx = document.getElementById('myChart');
                            const myChart = new Chart(ctx, {
                                type: 'line',
                                data: {

                                    labels: dataset,
                                    datasets: [{

                                        data: dataset,
                                        backgroundColor: [color],
                                        borderColor: [color],
                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                    maintainAspectRatio: false,
                                    elements: {
                                        point: {
                                            radius: 0
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                        title: {
                                            display: true,
                                            text: 'closing price-last month'
                                        }
                                    },
                                    scales: {
                                        x: {
                                            tricks: {
                                                reverse: true
                                            },
                                            display: false,
                                        },
                                        y: {
                                            min: minimum,
                                            max: maximum,
                                            display: false,
                                        }

                                    }
                                }
                            });



                            document.getElementById('search-button').addEventListener('click', () => {
                                myChart.destroy();
                                dataset = [];
                                console.log(dataset);
                                minimum = '';
                                maximum = ''
                            })

                        })

                    $.getJSON(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${yearAgo}/${yesterday}?adjusted=true&sort=desc&limit=120&apiKey=p5ViLMJtjypPJOx85B6Fhvpen20wqQoW`,
                        function(data) {

                            //chart1-for year
                            for (let i = 0; i < (data.results).length; i++) {
                                dataset1.push(data.results[i].c)

                            }
                            const revDataset1 = dataset1.reverse()
                                //conditions for y axis
                            for (let x = 0; x < revDataset1.length; x++) {
                                if (revDataset1[0] > revDataset1[revDataset1.length - 1]) {
                                    maximum = revDataset1[0] + revDataset1[0] / 2;
                                    minimum = revDataset1[revDataset1.length - 1] - revDataset1[revDataset1.length - 1] / 2
                                } else {
                                    maximum = revDataset1[0] - revDataset1[0] / 2;
                                    minimum = revDataset1[revDataset1.length - 1] + revDataset1[revDataset1.length - 1] / 2
                                }
                            }
                            //color
                            if (revDataset1[0] > revDataset1[revDataset1.length - 1]) {
                                color = red
                            } else {
                                color = green
                            }
                            const ctx1 = document.getElementById('myChart1');
                            const myChart1 = new Chart(ctx1, {
                                type: 'line',
                                data: {

                                    labels: dataset1,
                                    datasets: [{

                                        data: dataset1,
                                        backgroundColor: [color],
                                        borderColor: [color],
                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                    maintainAspectRatio: false,
                                    elements: {
                                        point: {
                                            radius: 0
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                        title: {
                                            display: true,
                                            text: 'closing price-last year'
                                        }
                                    },
                                    scales: {
                                        x: {
                                            tricks: {
                                                reverse: true
                                            },
                                            display: false,
                                        },
                                        y: {
                                            min: minimum,
                                            max: maximum,
                                            display: false,
                                        }

                                    }
                                }



                            });
                            document.getElementById('search-button').addEventListener('click', () => {
                                myChart1.destroy();
                                dataset1 = [];
                                console.log(dataset1);
                                minimum = '';
                                maximum = ''
                            })

                        })


                    $.getJSON(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${daysAgo}/${yesterday}?adjusted=true&sort=desc&limit=120&apiKey=p5ViLMJtjypPJOx85B6Fhvpen20wqQoW`,
                        function(data) {

                            for (let i = 0; i < (data.results).length; i++) {
                                dataset2.push(data.results[i].c)

                            }
                            const revDataset2 = dataset2.reverse()
                                //conditions for y axis
                            for (let x = 0; x < revDataset2.length; x++) {
                                if (revDataset2[0] > revDataset2[revDataset2.length - 1]) {
                                    maximum = revDataset2[0] + revDataset2[0] / 10;
                                    minimum = revDataset2[revDataset2.length - 1] - revDataset2[revDataset2.length - 1] / 10
                                } else {
                                    maximum = revDataset2[0] + revDataset2[0] / 10;
                                    minimum = revDataset2[revDataset2.length - 1] - revDataset2[revDataset2.length - 1] / 10
                                }
                            }

                            //color
                            if (revDataset2[0] > revDataset2[revDataset2.length - 1]) {
                                color = red
                            } else {
                                color = green
                            }
                            const ctx2 = document.getElementById('myChart2');
                            const myChart2 = new Chart(ctx2, {
                                type: 'line',
                                data: {

                                    labels: dataset2,
                                    datasets: [{

                                        data: dataset2,
                                        backgroundColor: [color],
                                        borderColor: [color],
                                        borderWidth: 1
                                    }]
                                },
                                options: {
                                    maintainAspectRatio: false,
                                    elements: {
                                        point: {
                                            radius: 0
                                        }
                                    },
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                        title: {
                                            display: true,
                                            text: 'closing price-last week'
                                        }
                                    },
                                    scales: {
                                        x: {
                                            tricks: {
                                                reverse: true
                                            },
                                            display: false,
                                        },
                                        y: {
                                            min: minimum,
                                            max: maximum,
                                            display: false,
                                        }

                                    }
                                }



                            });
                            document.getElementById('search-button').addEventListener('click', () => {
                                    myChart2.destroy();
                                    dataset2 = [];
                                    console.log(dataset2);
                                    minimum = '';
                                    maximum = ''
                                })
                                //}
                        })




                    //cashflow company
                    $.getJSON(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${symbol}&apikey=UKOEC25JWL0ZFLQ3`,
                        function(data) {


                            //cashflow annual reports
                            const CFIa = shorterNums(data.annualReports[0].cashflowFromInvestment);
                            const CFFa = shorterNums(data.annualReports[0].cashflowFromFinancing)
                            const CFOa = shorterNums(data.annualReports[0].operatingCashflow)
                            $('.cfi-value-a').text(CFIa)
                            $('.cff-value-a').text(CFFa)
                            $('.cfo-value-a').text(CFOa)


                            //cashflow quarterly reports
                            const CFIq = shorterNums(data.quarterlyReports[0].cashflowFromInvestment);
                            const CFFq = shorterNums(data.quarterlyReports[0].cashflowFromFinancing)
                            const CFOq = shorterNums(data.quarterlyReports[0].operatingCashflow)
                            $('.cfi-value-q').text(CFIq)
                            $('.cff-value-q').text(CFFq)
                            $('.cfo-value-q').text(CFOq)


                            //Nums cfs annu
                            const CFFnuma = Number(data.annualReports[0].cashflowFromFinancing)
                            CFFnuma < 0 ? $('.cff-a').css('backgroundColor', red) : $('.cff-a').css('backgroundColor', green)

                            const CFInuma = Number(data.annualReports[0].cashflowFromInvestment)
                            CFInuma < 0 ? $('.cfi-a').css('backgroundColor', yellow) : $('.cfi-a').css('backgroundColor', green)

                            const CFOnuma = Number(data.annualReports[0].operatingCashflow)
                            CFOnuma < 0 ? $('.cfo-a').css('backgroundColor', red) : $('.cfo-a').css('backgroundColor', green)

                            //Nums cfs quarterly

                            const CFFnumq = Number(data.quarterlyReports[0].cashflowFromFinancing)
                            CFFnumq < 0 ? $('.cff-q').css('backgroundColor', red) : $('.cff-q').css('backgroundColor', green)

                            const CFInumq = Number(data.quarterlyReports[0].cashflowFromInvestment)
                            CFInumq < 0 ? $('.cfi-q').css('backgroundColor', yellow) : $('.cfi-q').css('backgroundColor', green)

                            const CFOnumq = Number(data.quarterlyReports[0].operatingCashflow)
                            CFOnumq < 0 ? $('.cfo-q').css('backgroundColor', red) : $('.cfo-q').css('backgroundColor', green)

                        })

                    $.getJSON(`https://api.polygon.io/v2/reference/news?ticker=${symbol}&published_utc=${yesterday}&apiKey=p5ViLMJtjypPJOx85B6Fhvpen20wqQoW`,
                        function(data) {

                            for (let n = 0; n < (data.results).length; n++) {
                                let ul = document.getElementById('new')
                                let li = document.createElement('li')
                                let p = document.createElement('p')
                                let hr = document.createElement('hr')
                                let link = document.createElement('a')
                                link.setAttribute('href', data.results[n].article_url)
                                link.textContent = '(Article here)'
                                p.append(data.results[n].description)
                                li.append(p)
                                li.append(link)
                                li.append(hr)
                                ul.append(li)
                            }

                        }
                    )
                    $.getJSON(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=UKOEC25JWL0ZFLQ3`,
                        function(data) {

                            $('.bs-symbol').text(data.symbol)
                            $('.total-assets-a').text(shorterNums(data.annualReports[0].totalAssets))
                            $('.current-assets-a').text(shorterNums(data.annualReports[0].totalCurrentAssets))
                            $('.noncurrent-assets-a').text(shorterNums(data.annualReports[0].totalNonCurrentAssets))
                            $('.total-liabilities-a').text(shorterNums(data.annualReports[0].totalLiabilities))
                            $('.current-liabilities-a').text(shorterNums(data.annualReports[0].totalCurrentLiabilities))
                            $('.noncurrent-liabilities-a').text(shorterNums(data.annualReports[0].totalNonCurrentLiabilities))
                            $('.shareholders-equity-a').text(shorterNums(data.annualReports[0].totalShareholderEquity))

                            $('.total-assets-q').text(shorterNums(data.quarterlyReports[0].totalAssets))
                            $('.current-assets-q').text(shorterNums(data.quarterlyReports[0].totalCurrentAssets))
                            $('.noncurrent-assets-q').text(shorterNums(data.quarterlyReports[0].totalNonCurrentAssets))
                            $('.total-liabilities-q').text(shorterNums(data.quarterlyReports[0].totalLiabilities))
                            $('.current-liabilities-q').text(shorterNums(data.quarterlyReports[0].totalCurrentLiabilities))
                            $('.noncurrent-liabilities-q').text(shorterNums(data.quarterlyReports[0].totalNonCurrentLiabilities))
                            $('.shareholders-equity-q').text(shorterNums(data.quarterlyReports[0].totalShareholderEquity))

                        }
                    )
                }

            })
    }

})