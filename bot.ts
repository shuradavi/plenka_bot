import { Bot, InlineKeyboard, InputFile } from "grammy";
import 'dotenv/config'
// import { createReadStream } from "fs";

const bot = new Bot(process.env.BOT_TOKEN!)

// создаем клавиатуру с марками авто
const carLabelsPairs = [
    ['Kia', 'kia'],
    ['Changan', 'changan'],
    ['Ford', 'ford'],
    ['Toyota', 'toyota'],
    ['Mercedes', 'mercedes'],
]

const createButtons = (buttons: string[][]) => buttons.map(([label, data]) => InlineKeyboard.text(label, data))
const buttonRow = createButtons(carLabelsPairs)
    // carLabelsPairs.map(([label, data]) => InlineKeyboard.text(label, data));
const carLabelKeyboard = InlineKeyboard.from([buttonRow])

// создаем клавиатуру с моделями авто
// Kia
const kiaModelsPairs = [
    ['Ceed', 'ceed'],
    ['Cerato', 'cerato'],
    ['Mohave', 'mohave'],
]
const kiaModelKeyboard = InlineKeyboard.from([createButtons(kiaModelsPairs)])

// Ford
const fordModelsPairs = [
    ['Focus', 'focus'],
    ['Mondeo', 'mondeo'],
    ['Kuga', 'kuga']
]

const fordModelKeyboard = InlineKeyboard.from([createButtons(fordModelsPairs)])

bot.command('start', async (ctx) => {
    const chatId = ctx.msg.chat.id

    bot.api.sendMessage(chatId, 'Отправляю видео...')
    await bot.api.sendVideo(chatId, new InputFile('./video/movie.mp4'))
    await ctx.reply('Выберите марку вашего авто:', {
        parse_mode: 'HTML',
        reply_markup: carLabelKeyboard,
    })
})

bot.on('callback_query:data', async (ctx) => {
    const prevMsgId = ctx.msgId
})

// bot.callbackQuery("kia", async (ctx) => {
//     await ctx.reply('Выберите модель авто:', {
//         parse_mode: 'HTML',
//         reply_markup: kiaModelKeyboard,
//     })
// });
// bot.callbackQuery("changan", async (ctx) => {
//     await ctx.answerCallbackQuery({
//       text: "Ты выбрал Сhangan",
//     });
// });
// bot.callbackQuery("ford", async (ctx) => {
//     await ctx.reply('Выберите модель авто:', {
//         parse_mode: 'HTML',
//         reply_markup: fordModelKeyboard,
//     })
// });
// bot.callbackQuery("toyota", async (ctx) => {
//     await ctx.answerCallbackQuery({
//       text: "Ты выбрал Toyota",
//     });
// });
// bot.callbackQuery("mercedes", async (ctx) => {
//     await ctx.answerCallbackQuery({
//       text: "Ты выбрал Mercedes",
//     });
//   });
// Запуск бота
bot.start();