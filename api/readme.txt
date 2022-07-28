API for getting the current BTC to UAH rate with the ability to subscribe by email to notifications about rate changes.

JavaScript/Node.js

API:
- 'GET/rate'. Return the current BTC to UAH exchange rate in the response body.
- 'POST/subscribe'. -- Accepts request with a user`s email. The request checks the presence of an e-mail address in the database. If there is no data, it adds it to the database or gives an error if it exists.
- 'POST/sendEmails'. The request notifies subscribers about the current BTC to UAH exchange rate.
