const { app } = require('@azure/functions');
const reviews = require('../adapter/itunes');
const cosmosdas = require('../das/cosmosdb')

app.http('azureSentAnalysis', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        const { container } = await cosmosdas.getDatabaseAndContainer();
        console.log("Container retrieved");
        const appReviews = await reviews.getAppReviews();
        console.log("App reviews retrieved", appReviews);
        for (const item of appReviews) {
            try {
                const newItem = {
                    id: item.id.label,
                    title: item.title.label,
                    content: item.content.label,
                    updated: item.updated.label,
                };
                const readResult = await cosmosdas.readItem(container, newItem.id, newItem.id);
                if (!readResult) {
                    await cosmosdas.createItem(container, newItem);
                }
            } catch (error) {
                console.error('Error processing item:', error);
            }
          }
        console.log('All items processed.');
        const items = await cosmosdas.listItems(container);
        const sentAnalysis = await reviews.getSentimentAnalysis(items);

        return { body: JSON.stringify(sentAnalysis)  };
    }
});

