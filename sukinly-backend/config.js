require("dotenv").config();

const SECRET = process.env.SECRET_KEY || 'test';

const PORT = +process.env.PORT || 3001;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'sukinly-test'
// - else: 'sukinly'

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "sukinly-test";
} else {
  DB_URI  = process.env.DATABASE_URL || 'sukinly';
}

console.log("Using database", DB_URI);

module.exports = {
  SECRET,
  PORT,
  DB_URI,
};