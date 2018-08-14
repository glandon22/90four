Chart.defaults.scale.gridLines.display = false;

var ctx = document.getElementById("books-per-year").getContext('2d');

var booksPerYear = new Chart(ctx, {
	type: 'bar',
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
                    beginAtZero:true
                }
            }]
        }
    }
});