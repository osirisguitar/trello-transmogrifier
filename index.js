'use strict';

const fs = require('fs');

if (process.argv.length < 3) {
  console.log('Usage: node index <json infile>');
}

async function transmogrifyFile(fileName) {
  const jsonString = await getFile(fileName);
  const trelloData = JSON.parse(jsonString);

  const lists = {};

  trelloData.lists.forEach(list => {
    lists[list.id] = list;
    lists[list.id].cards = [];
  });

  trelloData.cards.forEach(card => {
    let list = lists[card.idList];

    list.cards.push(card);
  });

  Object.keys(lists).forEach(listName => {
    let list = lists[listName];
    list.cards.forEach(card => {
      console.log(csvEncode(list.name), ';' , csvEncode(card.name), ';', csvEncode(card.desc));
    })
  })
}

function getFile (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(process.argv[2], (err, data) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(data.toString());
      }
    });
  });
}

function csvEncode (string) {
  let encodedString = string.replace('\n=', '\n =').replace(/"/g, '""');
  return `"${encodedString}"`;
}

transmogrifyFile(process.argv[2]);