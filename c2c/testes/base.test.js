const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require("path");

const BASE_URL = process.env.APP_URL || "http://localhost:3000";

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

let driver;

async function tiraFoto(name) {

    try {

        const img = await driver.takeScreenshot();

        const file = path.join(SCREENSHOTS_DIR, `${name}.png`);

        fs.writeFileSync(file, img, 'base64');

        console.log('foto tirada');

    } catch (err) {

        console.log('erro ao tirar foto', err);
    }
}

async function main() {

    try {

        const opts = new chrome.Options();

        opts.addArguments(
            '--headless=new',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=800,640',
            '--disable-gpu'
        );

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(opts)
            .build();

        await driver.manage().setTimeouts({
            implicit: 5000,
            pageLoad: 15000
        });

        await driver.get(BASE_URL + '/login');

        await tiraFoto('Pagina_login');

        await driver.findElement(By.id('username')).sendKeys('Adm');

        await driver.findElement(By.id('password')).sendKeys('admin');

        await tiraFoto('Dados_preenchidos');

        await driver.findElement(By.id('loginForm')).submit();

        await new Promise(f => setTimeout(f, 800));

        await tiraFoto("Error");

        const errMsg= await driver.findElement(By.css('erro')).getText()
        if(!errMsg.includes('Invalidos')) throw new Error(`falhou:${errMsg}`)

    } finally {

        if (driver) {
            await driver.quit();
        }
    }
}

main().catch(err => {
    console.log('erro fatal', err);
    process.exit(1);
});