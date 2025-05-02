module.exports = {
    appId : process.env.APPID,
    cosmosdb : {
        endpoint : process.env.DB_ENDPOINT,
        key : process.env.DB_KEY,
        databaseId : process.env.DB_ID || 'cosmicworks',
        containerId : process.env.DB_CONTAINERID || 'customerreviews'
    },
    awsregion : process.env.REGION || 'eu-north-1',
    snstopic : process.env.SNSTOPIC || 'arn:aws:sns:eu-north-1:767398089028:emailTopic',
    ddb : {
        tablename: process.env.DB_TABLENAME || 'customerreviews'
    }
}