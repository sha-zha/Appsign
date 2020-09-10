let dbUrl = ''
if (process.env.DB_URL) {
    dbUrl = process.env.DB_URL
    console.log(`Connecting to ${dbUrl}`);
}

module.exports = {
  url : dbUrl
}
