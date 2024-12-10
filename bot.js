"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
require("dotenv/config");
// import { createReadStream } from "fs";
const bot = new grammy_1.Bot(process.env.BOT_TOKEN);
// создаем клавиатуру с марками авто
const carLabelsPairs = [
    ['Kia', 'kia'],
    ['Changan', 'changan'],
    ['Ford', 'ford'],
    ['Toyota', 'toyota'],
    ['Mercedes', 'mercedes'],
];
const createButtons = (buttons) => buttons.map(([label, data]) => grammy_1.InlineKeyboard.text(label, data));
const buttonRow = createButtons(carLabelsPairs);
// carLabelsPairs.map(([label, data]) => InlineKeyboard.text(label, data));
const carLabelKeyboard = grammy_1.InlineKeyboard.from([buttonRow]);
// создаем клавиатуру с моделями авто
// Kia
const kiaModelsPairs = [
    ['Ceed', 'ceed'],
    ['Cerato', 'cerato'],
    ['Mohave', 'mohave'],
];
const kiaModelKeyboard = grammy_1.InlineKeyboard.from([createButtons(kiaModelsPairs)]);
// Ford
const fordModelsPairs = [
    ['Focus', 'focus'],
    ['Mondeo', 'mondeo'],
    ['Kuga', 'kuga']
];
const fordModelKeyboard = grammy_1.InlineKeyboard.from([createButtons(fordModelsPairs)]);
bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = ctx.msg.chat.id;
    bot.api.sendMessage(chatId, 'Отправляю видео...');
    yield bot.api.sendVideo(chatId, new grammy_1.InputFile('./video/movie.mp4'));
    yield ctx.reply('Выберите марку вашего авто:', {
        parse_mode: 'HTML',
        reply_markup: carLabelKeyboard,
    });
}));
bot.callbackQuery("kia", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply('Выберите модель авто:', {
        parse_mode: 'HTML',
        reply_markup: kiaModelKeyboard,
    });
}));
bot.callbackQuery("changan", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.answerCallbackQuery({
        text: "Ты выбрал Сhangan",
    });
}));
bot.callbackQuery("ford", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply('Выберите модель авто:', {
        parse_mode: 'HTML',
        reply_markup: fordModelKeyboard,
    });
}));
bot.callbackQuery("toyota", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.answerCallbackQuery({
        text: "Ты выбрал Toyota",
    });
}));
bot.callbackQuery("mercedes", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.answerCallbackQuery({
        text: "Ты выбрал Mercedes",
    });
}));
// Запуск бота
bot.start();
