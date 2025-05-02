const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const text = "I love programming with Node.js! It's so much fun and rewarding.";
const result = sentiment.analyze(text);

console.log(`Text: ${text}`);
console.log(`Sentiment Score: ${result.score}`);
console.log(`Comparative Score: ${result.comparative}`);
console.log(`Tokens: ${result.tokens}`);
console.log(`Words: ${result.words}`);
console.log(`Positive Words: ${result.positive}`);
console.log(`Negative Words: ${result.negative}`);