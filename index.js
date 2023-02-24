// A express  server which will handle api request coming in and respond back with json object, it will use body parser as well as cross

//Import OpenAI
const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  organization: "org-A8gh9bEegqsjsfKlLjv4ZeGn",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const donaldTrumpPhrases = [
    `Get going. Move forward. Aim High. Plan a takeoff. Don't just sit on the runway and hope someone will come along and push the airplane. It simply won't happen. Change your attitude and gain some altitude. Believe me, you'll love it up here.`,
    `As long as you are going to be thinking anyway, think big.`,
    `Show me someone without an ego, and I'll show you a loser.`,
    `When you are wronged repeatedly, the worst thing you can do is continue taking it--fight back! `,
    `What separates the winners from the losers is how a person reacts to each new twist of fate.`,
    `It doesn't hurt to get more education.`,
    `Sometimes your best investments are the ones you don't make.`,
    `What's the point of having great knowledge and keeping them all to yourself?`,
    `Anyone who thinks my story is anywhere near over is sadly mistaken.`,
    `I've read hundreds of books about China over the decades. I know the Chinese. I've made a lot of money with the Chinese. I understand the Chinese mind.`,
    `I try to learn from the past, but I plan for the future by focusing exclusively on the present. That's were the fun is.`,
    `One of the problems when you become successful is that jealousy and envy inevitably follow. There are people—I categorize them as life’s losers—who get their sense of accomplishment and achievement from trying to stop others. As far as I’m concerned, if they had any real ability they wouldn’t be fighting me, they’d be doing something constructive themselves.`,
    `I know words. I have the best words.`,
    `Remember There’s No Such Thing As An Unrealistic Goal – Just Unrealistic Time Frames`,
    `Don't get sidetracked. If you do get sidetracked, get back on track as soon as possible. Ultimately sidetracking kills you.`,
    `You know, it really doesn't matter what (the media) write as long as you've got a young and beautiful piece of ass.`,
    `I’ve always felt that a lot of modern art is a con, and that the most successful painters are often better salesmen and promoters than they are artists.`,
    `I discovered, for the first time but not the last, that politicians don’t care too much what things cost. It’s not their money.`,
    `And if it can’t be fun, what’s the point?`,
    `good publicity is preferable to bad, but from a bottom-line perspective, bad publicity is sometimes better than no publicity at all. Controversy, in short, sells.`,
    `Watch, listen, and learn. You can’t know it all yourself. Anyone who thinks they do is destined for mediocrity.`,
    `MY STYLE of deal-making is quite simple and straightforward. I aim very high, and then I just keep pushing and pushing and pushing to get what I’m after.`,
    `Everything in life is luck.`,
    `My people keep telling me I shouldn’t write letters like this to critics. The way I see it, critics get to say what they want to about my work, so why shouldn’t I be able to say what I want to about theirs?`,
  ];
  const donaldTrumpPhrasesString = donaldTrumpPhrases.join(" ");

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Answer the following question. It must sound as donald trump answered it. Consider that Donald Trump said the following phrases: ${donaldTrumpPhrasesString} message to answer: ${message}`,
    max_tokens: 1200,
    temperature: 0.9,
  });
  console.log(response.data);
  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
