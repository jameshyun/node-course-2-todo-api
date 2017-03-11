const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!'

// bcrypt.genSalt(10, (err, salt) => {
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log(hash);
// 	});
// });

var hashedPassword = '$2a$10$AwubvGMeTeAWc4nDJQMzOeCx7mM7N40FTxgEf38BK1sDWXj8v2jaG';

bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res); // this return true, compare password(plain text) and hashedPassword
})

// var data = {
// 	id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);


// var data = {
// 	id: 4
// };
// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString() // hashed of data
// }


// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
// 	console.log('Data was not change');
// } else {
// 	console.log('Data was changed. Don\'t trust');
// }







/**
 * jwt.sign(data, secret) for token to user
 * e.g. 
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
     .eyJpZCI6MTAsImlhdCI6MTQ4OTE0MTMxN30
     ._7GH2uoy75JKCfVWhFyI3UPuLkJZCZp_L-gJ3bUZdAg
   first part is header
   second part is payload
   third part is hash which allow us to verify the payload was never changed

   jwt.verify(data, secret) verify if the data never changed. data, secret must be the same that used when sign
 */