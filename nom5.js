'use strict';
const LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./input/dataSet.csv');

const data = [];
lr.on('error', function (err) 
{
    
}
);
console.log("Начало загрузки: " + new Date());
lr.on('line', function (line) 
{
    // pause emitting of lines...
    lr.pause();

    // ...do your asynchronous line processing..
  setTimeout(function () 
	{
		let columns = line.split(";");
		if (columns.length == 19)
		{
			data.push(columns);
		}
		else 
		{
			
		}
               lr.resume();
	}, 
	0
	);
}
);

lr.on('end', function () 
{
    // All lines are read, file is closed now.
    console.log("Конец загрузки: " + new Date());
    main();
});


function getPopularAuthors(arr) 
{
    return new Promise((resolve, reject) => 
    {
			var wordResult = new Map();
			let popularAuthor = new Set();
			for (let line of arr)
			{
				
					let counter = wordResult.get(line[3]);
					if (counter == undefined)
						wordResult.set(line[3], parseInt(line[15]));
					else
						wordResult.set(line[3], counter + parseInt(line[15]));
			}
			wordResult[Symbol.iterator] = function* () 
			{
				yield* [...this.entries()].sort((b, a) => a[1] - b[1]);
			}
			let count = 0;
			for (let [key, value] of wordResult) 
			{
				if (value > 1)
				//console.log(key + ' ' + value);
				popularAuthor.add(key);
				count++;
				if (count == 10)
					break;
			}

			resolve(popularAuthor);
		}
	)
}
function getPopularTweets(arr)
{
    return new Promise((resolve, reject) => 
		{
			var wordResult = new Map();
			var otherInfo = new Map();
			let popularWords = new Set();
			for (let line of arr)
			{
				//let words = line[6].split(/ |-/);
				//for (let word of words)
				{
					let counter = wordResult.get(line[6]);
					if (counter == undefined)
					{
						
						wordResult.set(line[6], 1);
						otherInfo.set(line[6], [line[3], line[15]]);
					}
					else
					{
						wordResult.set(line[6], counter + 1);
						otherInfo.set(line[6], [line[3], line[15]]);
					}
				}
			}
			wordResult[Symbol.iterator] = function* () 
			{
				yield* [...this.entries()].sort((b, a) => a[1] - b[1]);
			}
			let count = 0;
			for (let [key, value] of wordResult) 
			{     // get data sorted
				//if (value > 1)
				//console.log(key + ' ' + value);
				popularWords.add([key,otherInfo[key]]);
				count++;
				if (count == 10)
					break;
			}

			resolve(popularWords);
		}
	)
}

function getCountries(arr) 
{
    return new Promise((resolve, reject) => 
		{
			let country = new Set();
			//t result = [];
			for (let line of arr)
			{
				country.add(line[11]);
			}
			resolve(country);
		}
	)
}


function getPopularWords(arr) {
    return new Promise((resolve, reject) => 
		{
			var wordResult = new Map();
			let popularWords = new Set();
			for (let line of arr)
			{
				let words = line[6].split(/ |-/);
				for (let word of words)
				{
					let counter = wordResult.get(word);
					if (counter == undefined)
						wordResult.set(word, 1);
					else
						wordResult.set(word, counter + 1);
				}
			}
			wordResult[Symbol.iterator] = function* () 
			{
				yield* [...this.entries()].sort((b, a) => a[1] - b[1]);
			}
			let count = 0;
			for (let [key, value] of wordResult) 
			{     // get data sorted
				//if (value > 1)
				//console.log(key + ' ' + value);
				popularWords.add(key);
				count++;
				if (count == 10)
					break;
			}

			resolve(popularWords);
		}
	)
}

function main () 
{
	//var Promise = require('es6-promise').Promise;
    let promises = [];
    promises.push(getPopularWords(data));
    promises.push(getPopularTweets(data));
    promises.push(getPopularAuthors(data));
    promises.push(getCountries(data));
    Promise.all(promises).then((result) => print(result));
}

function print(result) 
{
	//console.log(result[0].length);
	for (let a of result[0])
	{
		console.log(a);
	}
	//console.log(result[1].length);
	for (let a of result[1])
	{
		console.log(a);
	}
	//console.log(result[2].length);
	for (let a of result[2])
	{
		console.log(a);
	}
	//console.log(result[3].length);
	for (let a of result[3])
	{
		console.log(a);
	}
	//console.log(result[1].length);
}

main();
