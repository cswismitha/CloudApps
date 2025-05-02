const axios = require('axios');
const Sentiment = require('sentiment');


const sentiment = new Sentiment();

async function getAppReviews() {
    try {
        const response = await axios.get('https://itunes.apple.com/us/rss/customerreviews/id=389801252/json');
        console.log('Received app reviews');
        const feeds = response.data.feed.entry;
        return feeds;
    } catch (error) {
        console.log(error);
    }
}

async function getSentimentAnalysis(feeds) {
    let analyzeResponse = [];
    try {
        feeds.forEach(element => {
            const result = sentiment.analyze(element.content);

            console.log(`Text: ${element.content}`);
            console.log(`Sentiment Score: ${result.score}`);
            console.log(`Comparative Score: ${result.comparative}`);
            console.log(`Tokens: ${result.tokens}`);
            console.log(`Words: ${result.words}`);
            console.log(`Positive Words: ${result.positive}`);
            console.log(`Negative Words: ${result.negative}`);
            analyzeResponse.push(result);
        });
        return analyzeResponse;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAppReviews,
    getSentimentAnalysis
};