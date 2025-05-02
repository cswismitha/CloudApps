const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const config = require("../config")

const snsClient = new SNSClient({ region: config.awsregion }); 
const topicArn = config.snstopic; 

async function notify() {
    const message = {
        subject: 'Reviews processed',
        body: 'Customer Reviews processed for analyzing the sentiments.'
    };

    const params = {
        TopicArn: topicArn,
        Subject: message.subject,
        Message: message.body
    };

    try {
        const data = await snsClient.send(new PublishCommand(params));
        console.log("Message sent to SNS:", data);
    } catch (err) {
        console.error("Error sending message to SNS:", err);
    }
}

module.exports = {
    notify
};
