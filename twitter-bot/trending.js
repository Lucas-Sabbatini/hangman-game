const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
let trendindsArr = [];
const client = new TwitterApi({
    appKey: '5lbygbmCkiSjx14G8vfZu0AwI',
    appSecret: 'TlpeRFJX1ZYAXXGHGzB4B4JlTASoMjS3jqalVWKZhA0uw4WHPl',
});

async function adicionar1() {
    const trendsOfNy = await client.v1.trendsByPlace(455827);

    for (const { trends, created_at } of trendsOfNy) {
        for (const trend of trends) {
        if (trendindsArr.length < 10) trendindsArr.push(trend.name);
        }
    }
    fs.writeFileSync('forca/trends.json', JSON.stringify(trendindsArr),(err)=>{if(err) throw err});
}

adicionar1();