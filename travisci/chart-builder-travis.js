Chart.defaults.scale.gridLines.display = false;

var ctx = document.getElementById("books-per-year").getContext('2d');
var pages = document.getElementById("pages-per-year").getContext('2d');

var booksPerYear = new Chart(ctx, {
	type: 'horizontalBar',
    data: {
        labels: 'books-labels',
        datasets: [{
            label: 'Books',
            data: 'books-data',
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
                    maxTicksLimit: 5,
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
    type: 'horizontalBar',
    data: {
        labels: 'pages-labels',
        datasets: [{
            label: 'Books',
            data: 'pages-data',
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
                ticks: {
                    beginAtZero:true,
                    fontSize: 40,
                    fontColor: "#273434"
                },
                gridLines: {
                    color: "#273434"
                },
                categoryPercentage: 1.0,
                barPercentage: .95,
            }],
            xAxes: [{
                ticks: {
                    fontSize: 30,
                    autoSkip: true,
                    maxTicksLimit: 4,
                    fontColor: "#273434",
                    max: 15000,
                    callback: function(value, index, values) {
                        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                },
                gridLines: {
                    color: "#273434"
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            }
        },
        legend: {
            display: false
        },
        title: {
            display: true,
            text: "Number of Pages Read Annually",
            fontSize: 30,
            fontColor: "#273434"
        }
    }
});