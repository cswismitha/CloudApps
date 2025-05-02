const reviews = require("./src/adapter/itunes");
const ddb = require("./src/das/ddbv3")
const sns = require("./src/notification/sns")
const config = require("./src/config")
const utils = require("./src/utils")

// Lambda function handler
exports.handler = async (event, context) => {
  console.log(event);
  const appId = config.appId;
  const appReviews = await reviews.getAppReviews();
  console.log("App reviews retrieved", appReviews);
  for (const item of appReviews) {
    try {
      const ts = item.updated.label;
      const newItem = {
        "PK": { S : "APP#" + appId },
        "SK": { S: "CR#" + utils.stringToTimeString(ts) },
        "id": { S:item.id.label },
        "title": { S : item.title.label },
        "content": { S : item.content.label },
        "updated": { S : item.updated.label }
      };
      console.log(newItem);
      await ddb.createItem(newItem);
    } catch (error) {
      console.error('Error processing item:', error);
    }
  }
  console.log('All items processed.');
  const items = await ddb.queryDynamoDBByPartitionKey({ S : "APP#" + appId });
  const sentAnalysis = await reviews.getSentimentAnalysis(items);
  await sns.notify();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Adjust CORS as needed
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    body: JSON.stringify(sentAnalysis),
  };
};
  