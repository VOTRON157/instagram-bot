import puppeteer from "puppeteer";

interface Account {
    email: string,
    senha: string,
};

async function login(account: Account) {
    if (!account) return new TypeError("Você precisa passar o parametro 'account'.")
    const browser = await puppeteer.launch({ slowMo: 250, headless: false });
    const page = await browser.newPage();
    await page.goto('https://instagram.com');
    async function write() {
        await page.waitForSelector('input[name=username]')
        await page.waitForSelector('input[name=password]')
        await page.type('input[name=username]', account.email);
        await page.type('input[name=password]', account.senha);
        await page.waitForSelector('button[type=submit]')
        console.log("\x1b[36m%s\x1b[0m", "[ LOGGED ]")
        await page.click('button[type=submit]')
        await page.waitForSelector('svg[aria-label=Messenger]')
        await page.click('svg[aria-label=Messenger]')
        await page.waitForSelector('button[class="aOOlW   HoLwm "]')
        await page.click('button[class="aOOlW   HoLwm "]')
        await page.click('div[class="-qQT3 rOtsg"]')
    }
    await write()
    
    await page.screenshot({ path: 'captura.png' });
}

login({
    senha: "sua senha do insta",
    email: "seu e email do insta"
})
