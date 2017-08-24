const db = require('../db.js');

const sourceCount = 100;
const linkCount = 1000;

const sources = new Array(sourceCount).fill().map(() => {
  const name = Math.random().toString(36).substring(2, 5);
  return {
    name,
  }
});

const links = new Array(linkCount).fill().map(() => {
  const title = Math.random().toString(36).substring(2, 5);
  const link = title;
  const source_id = Math.floor(Math.random() * sourceCount) + 1;
  return {
    title,
    link,
    source_id,
  }
});

module.exports = {
  batchInsertSourcesTest() {
    return db.batchInsertSources(sources);
  },
  batchInsertLinksTest() {
    return db.batchInsertLinks(links);    
  }
}