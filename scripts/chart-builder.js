Chart.defaults.scale.gridLines.display = false;

var ctx = document.getElementById("books-per-year").getContext('2d');
var pages = document.getElementById("pages-per-year").getContext('2d');

var booksPerYear = new Chart(ctx, {
	type: 'horizontalBar',
    data: {
        labels: [ '2014', '2015', '2016', '2017', '2018' ],
        datasets: [{
            label: 'Books',
            data: [ 1, 11, 38, 29, 21 ],
            backgroundColor: [
                'rgba(118, 177, 179, .2)',
                'rgba(118, 177, 179, .2)',
                'rgba(118, 177, 179, .2)',
                'rgba(118, 177, 179, .2)',
                'rgba(118, 177, 179, .2)'
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            yAxes: [{
                categoryPercentage: 1.0,
                barPercentage: .95,
                ticks: {
                    beginAtZero:true,
                    fontSize: 40,
                    fontColor: "#273434"

                },
                gridLines: {
                    color: "#273434"
                } 
            }],
            xAxes: [{
                ticks: {
                    fontSize: 30,
                    autoSkip: true,
                    maxTicksLimit: 3,
                    fontColor: "#273434"
                },
                gridLines: {
                    color: "#273434"
                }
            }]
        },
        legend: {
            display: false
        },
        title: {
            display: true,
            text: "Number of Books Read Annually",
            fontSize: 30,
            fontColor: "#273434"
        }
    }
});

var pagesPerYear = new Chart(pages, {
    type: 'bar',
    data: {
        labels: [ '2014', '2015', '2016', '2017', '2018' ],
        datasets: [{
            label: 'Books',
            data: [ 444, 3134, 14020, 8647, 6463 ],
            backgroundColor: [
                'rgba(118, 177, 179, .2)',
                'rgba(118, 177, 179, .2)',
                'rgba(118, 177, 179, .2)',
                'rgba(118, 177, 179, .2)',
                'rgba(118, 177, 179, .2)'
            ],
            borderColor: [
                'rgba(118, 177, 179, 1)',
                'rgba(118, 177, 179, 1)',
                'rgba(118, 177, 179, 1)',
                'rgba(118, 177, 179, 1)',
                'rgba(118, 177, 179, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    callback: function(value, index, values) {
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            }
        }
    }
});