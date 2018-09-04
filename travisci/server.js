/**
*
*
* IMPORT VARIABLES
*
**/

const configVars = require('./configvars.js');
let books = require('./books.js').books;
const KEY = configVars.KEY;

/**
*
*
* IMPORT NPM PACKAGES
*
**/

const util = require('util');
const _async = require('async');
const moment = require('moment');
const ncp = require('ncp').ncp;
moment().format();
const parseString = require('xml2js').parseString;
const request = require('request');
const fs = require('fs');

/**
*
*
* SAVE URL TO CALL GOODREADS
*
**/

const reqURLShelf = 'https://www.goodreads.com/review/list/38233116.xml?v=2&per_page=20&page=1&sort=date_read&shelf=read&key=' + KEY;

/**
*
*
* FUNCTION DEFINITIONS
*
**/

//pull in goodreads shitty xml object and extract the info that i want
function cleanGoodReadsResponse(booksArray) {
	
	let loadNewBooks = false;
	//loop over response and only save the data points i need for each book
	for (let i = booksArray.length - 1; i > 0; i--) {
		//once load new books is set to true, the new books will be pushed into the new books object
		if (loadNewBooks) {
				books.push({
				title: booksArray[i]['book'][0]['title'][0],
				author: booksArray[i]['book'][0]['authors'][0]['author'][0]['name'][0],
				//some books do not have a page number associated from goodreads
				//if this is the case, set pages to a generic 250
				pages: booksArray[i]['book'][0]['num_pages'][0] !== '' ? booksArray[i]['book'][0]['num_pages'][0] : 250,
				rating: booksArray[i]['rating'][0],
				readMonth: moment(booksArray[i]['read_at'][0],"ddd MMM DD hh:mm:ss ZZ YYYY").format('MMMM'),
				readYear: moment(booksArray[i]['read_at'][0],"ddd MMM DD hh:mm:ss ZZ YYYY").format('YYYY'),
				bookLink: booksArray[i]['book'][0]['link'][0],
				bookDescription: booksArray[i]['book'][0]['description'][0],
				bookThumbnail: booksArray[i]['book'][0]['image_url'][0]
			});
		}
		//the following books are new and need to be added to the books variable
		else if (booksArray[i]['book'][0]['title'][0] === books[books.length - 1]['title']) {
			loadNewBooks = !loadNewBooks;
		}
	}

	return books;
}

//create a d3 array of abjects for books read per year linegraph
function createBooksPerYearGraph(masterBookData) {
	let booksPerYearData = {};
	for (let i = 0; i < masterBookData.length; i++) {
		//year has already been added to object
		if (booksPerYearData.hasOwnProperty(masterBookData[i]['readYear'])) {
			booksPerYearData[masterBookData[i]['readYear']]++;
		}

		//need to add year to object
		else {
			booksPerYearData[masterBookData[i]['readYear']] = 1;
		}
	}

	let chartData = {
		years: [],
		books: []
	};

	for (year in booksPerYearData) {
		chartData.years.push(year);
		chartData.books.push(booksPerYearData[year]);
	}

	return chartData;
}

function createPagesPerYearGraph(masterBookData) {
	
	let pagesPerYearData = {};

	for (let i = 0; i < masterBookData.length; i++) {
		
		if (pagesPerYearData.hasOwnProperty(masterBookData[i]['readYear'])) {
			pagesPerYearData[masterBookData[i]['readYear']] += parseInt(masterBookData[i]['pages']);
		}

		else {
			pagesPerYearData[masterBookData[i]['readYear']] = parseInt(masterBookData[i]['pages']);
		}
	}

	let chartData = {
		years: [],
		pages: []
	};

	for (year in pagesPerYearData) {
		chartData.years.push(year);
		chartData.pages.push(pagesPerYearData[year]);
	}

	return chartData;
}

function buildBookList(books) {

	//pass in the books array from books.js
	//read in books.html page and save as data string similar
		//as i did for chart builder
	//set up for loop to begin looping over books
	//create a string of html and add in variables for each book
	//append that new string to the existing string of books
	//check to see if iterator is equal tp 40	
		//40 is going to be max number of books on a page
	//if not, keep going
	//if 40, load string into a copy of books.html
	//save that copy as books + i /40 + .html
	//write that file into the builds/html folder
		//this is done to create pagination
	let bookListHTML = '';
	let fiveStars = ['&#9733;', '&#9733;', '&#9733;', '&#9733;', '&#9733;'];

	for (let i = 0; i < books.length; i++) {
		let stars = fiveStars.slice(0,parseInt(books[i].rating)).join(' ');
		bookListHTML += 
		'<div class="short-divider"></div>' +
		'<li class="book-entry">' + 
			'<div class="book-image">' +
				'<img src="' + books[i].bookThumbnail + '">' +
			'</div>' +
			'<div class="title-author">' +
				'<div class="book-title">' +
					books[i].title +
				'</div>' +
				'<div class="book-author">' +
					books[i].author +
				'</div>' +
			'</div>' +
			'<div class="stars">' +
				stars +
			'</div>' +
		'</li>';
	}

	let booksHTML = '';
	fs.readFile('./books-travis.html', 'utf-8', function(err, data) {
		if (err) throw err;
		booksHTML = data.replace(/add-book-list-here/, bookListHTML);
		fs.writeFile('../build/html/books.html', booksHTML, 'utf-8', function (err) {
	    	if (err) throw err;
	    	console.log('completed2');
	    });
	});

}

//make a build directory for travis to deploy
fs.mkdirSync('../build');
fs.mkdirSync('../build/assets');
fs.mkdirSync('../build/html');
fs.mkdirSync('../build/scripts');
ncp("../assets", "../build/assets", function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});

ncp("../html", "../build/html", function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});

ncp("../scripts", "../build/scripts", function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});

fs.copyFile('../index.html', '../build/index.html', (err) => {
  if (err) throw err;
  console.log('copy complete!');
});

request.get(reqURLShelf, function(err, res, body) {
	parseString(body, async function(err,res) {
		const masterBookData = await cleanGoodReadsResponse(res.GoodreadsResponse['reviews'][0]['review']);
		const booksPerYearGraphData = await createBooksPerYearGraph(masterBookData);
		const pagesperYearGraphData = await createPagesPerYearGraph(masterBookData);
		//write in the book data to che chart script
		fs.readFile('./chart-builder-travis.js', 'utf-8', function(err, data) {
			if (err) throw err;
			let updatedChart = data.replace(/\'books-labels\'/, JSON.stringify(booksPerYearGraphData.years));
			updatedChart = updatedChart.replace(/\'books-data\'/, JSON.stringify(booksPerYearGraphData.books));
			updatedChart = updatedChart.replace(/\'pages-labels\'/, JSON.stringify(pagesperYearGraphData.years));
			updatedChart = updatedChart.replace(/\'pages-data\'/, JSON.stringify(pagesperYearGraphData.pages));
			fs.writeFile('../build/scripts/chart-builder.js', updatedChart, 'utf-8', function (err) {
		    	if (err) throw err;
		    	console.log('completed1');
		    });
		});
		buildBookList(books);
	});	
});