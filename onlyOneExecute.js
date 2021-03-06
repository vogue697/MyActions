const exec = require("child_process").execSync;
const fs = require("fs");
const axios = require("axios");
const smartReplace = require("./smartReplace");

// 公共变量
const Secrets = {
    JD_COOKIE: process.env.JD_COOKIE, //cokie,多个用&隔开即可
    SyncUrl: process.env.SYNCURL, //签到地址,方便随时变动
    PUSH_KEY: process.env.PUSH_KEY, //server酱推送消息
    BARK_PUSH: process.env.BARK_PUSH, //Bark推送
    TG_BOT_TOKEN: process.env.TG_BOT_TOKEN, //TGBot推送Token
    TG_USER_ID: process.env.TG_USER_ID, //TGBot推送成员ID
    MarketCoinToBeanCount: process.env.JDMarketCoinToBeans, //京小超蓝币兑换京豆数量
    JoyFeedCount: process.env.JDJoyFeedCount, //宠汪汪喂食数量
    FruitShareCodes: process.env.FruitShareCodes, //京东农场分享码
    Unsubscribe: process.env.UNSUBSCRIBE, //取关商铺
    SUPERMARKET_UPGRADE: process.env.SUPERMARKET_UPGRADE, //京小超自动升级
    SUPERMARKET_LOTTERY: process.env.SUPERMARKET_LOTTERY, //京小超抽奖
    FRUIT_BEAN_CARD: process.env.FRUIT_BEAN_CARD, //农场使用水滴换豆卡
    MARKET_COIN_TO_BEANS: process.env.MARKET_COIN_TO_BEANS, //京小超兑换京豆数量
    BUSINESS_CIRCLE_JUMP: process.env.BUSINESS_CIRCLE_JUMP, //京小超自动更换商圈
    SUPERMARKET_LOTTERY: process.env.SUPERMARKET_LOTTERY, //京小超抽奖
    FRUIT_BEAN_CARD: process.env.FRUIT_BEAN_CARD, //农场使用水滴换豆卡
    UN_SUBSCRIBES: process.env.UN_SUBSCRIBES, //取关店铺
    JOY_FEED_COUNT: process.env.JOY_FEED_COUNT, //cokie,宠汪汪喂食数量
    JOY_HELP_FEED: process.env.JOY_HELP_FEED, //宠汪汪帮好友喂食
    JOY_RUN_FLAG: process.env.JOY_RUN_FLAG, //宠汪汪参加双人赛跑
     BARK_PUSH: process.env.BARK_PUSH, //Bark推送
    TG_BOT_TOKEN: process.env.TG_BOT_TOKEN, //TGBot推送Token
    TG_USER_ID: process.env.TG_USER_ID, //TGBot推送成员ID
    MarketCoinToBeanCount: process.env.JDMarketCoinToBeans, //京小超蓝币兑换京豆数量
    JoyFeedCount: process.env.JDJoyFeedCount, //宠汪汪喂食数量
    FruitShareCodes: process.env.FruitShareCodes, //京东农场分享码
    Unsubscribe: process.env.UNSUBSCRIBE, //取关商铺
    JOY_FEED_COUNT: process.env.JOY_FEED_COUNT, //cokie,宠汪汪喂食数量
    JOY_HELP_FEED: process.env.JOY_HELP_FEED, //宠汪汪帮好友喂食
    JOY_RUN_FLAG: process.env.JOY_RUN_FLAG, //宠汪汪参加双人赛跑
    MARKET_COIN_TO_BEANS: process.env.MARKET_COIN_TO_BEANS, //京小超兑换京豆数量
    SUPERMARKET_UPGRADE: process.env.SUPERMARKET_UPGRADE, //京小超自动升级
    BUSINESS_CIRCLE_JUMP: process.env.BUSINESS_CIRCLE_JUMP, //京小超自动更换商圈
    SUPERMARKET_LOTTERY: process.env.SUPERMARKET_LOTTERY, //京小超抽奖
    FRUIT_BEAN_CARD: process.env.FRUIT_BEAN_CARD, //农场使用水滴换豆卡
    UN_SUBSCRIBES: process.env.UN_SUBSCRIBES, //取关店铺
};

async function changeFiele() {
    let response = await axios.get(Secrets.SyncUrl);
    let content = response.data;
    content = await smartReplace.replaceWithSecrets(content, Secrets);
    await fs.writeFileSync("./execute.js", content, "utf8");
    console.log("替换变量完毕");
}

async function start() {
    console.log(`当前执行时间:${new Date().toString()}`);
    if (!Secrets.JD_COOKIE) {
        console.log("请填写 JD_COOKIE 后在继续");
        return;
    }
    if (!Secrets.SyncUrl) {
        console.log("请填写 SYNCURL 后在继续");
        return;
    }
    console.log(`当前共${Secrets.JD_COOKIE.split("&").length}个账号需要签到`);
    try {
        await changeFiele();
        await exec("node execute.js", { stdio: "inherit" });
    } catch (e) {
        console.log("执行异常:" + e);
    }
    console.log("执行完毕");
}

start();
