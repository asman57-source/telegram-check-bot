const TelegramBot = require('node-telegram-bot-api');
const { GoogleSpreadsheet } = require('google-spreadsheet');

// تنظیمات اولیه
const token = 'YOUR_BALE_BOT_TOKEN'; //1802630088:xPfx0PrUE_OUIB61U-CyQSIVtCVMf8XypoM
const bot = new TelegramBot(token, { polling: true });
const SHEET_ID = '1nYXoRIfuGsP13M51EU3TygqAG_VkyQXeNBGAoY8mDec'; // اینجا ID فایل Sheets را قرار بده

// دستورات ربات
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, سلام! 🤖 
به ربات چک‌یار خوش آمدی!

دستورات موجود:
/newcheck - ثبت چک جدید
/listchecks - مشاهده چک‌ها
/help - راهنما);
});

bot.onText(/\/newcheck/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, لطفاً اطلاعات چک را به این فرمت وارد کن:
    
شماره چک, مبلغ, تاریخ سررسید, گیرنده, صادرکننده

مثال:
۱۲۳۴, ۵۰۰۰۰۰۰, 1403/07/15, بانک ملی, شرکت کیمیا);
});

// پردازش پیام‌های معمولی
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // اگر پیام با اسلش شروع شود (دستور است) کاری نکن
    if (text.startsWith('/')) return;

    // اگر پیام شبیه اطلاعات چک است
    if (text.includes(',')) {
        const parts = text.split(',').map(part => part.trim());
        
        if (parts.length >= 5) {
            bot.sendMessage(chatId, ✅ چک ثبت شد!
            
شماره: ${parts[0]}
مبلغ: ${parts[1]}
تاریخ: ${parts[2]}
گیرنده: ${parts[3]}
صادرکننده: ${parts[4]}

برای ثبت در Sheets، باید تنظیمات تکمیل شود.);
        }
    }
});

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 📖 راهنمای ربات چک‌یار:

1. برای ثبت چک جدید: /newcheck
2. سپس اطلاعات را به فرمت زیر وارد کن:
شماره, مبلغ, تاریخ, گیرنده, صادرکننده

3. برای مشاهده چک‌ها: /listchecks

ساخته شده با ❤️ توسط تو!);
});

console.log('🤖 ربات چک‌یار راه‌اندازی شد...');
