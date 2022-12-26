import puppeteer from "puppeteer";
import promptSync from 'prompt-sync';

function printHTML(title, poster, source) {
    var html = "<figure>\n"
    html += ("\t<video controls");
    if (poster != null) {
        html += " poster=" + poster;
    }
    html += ">\n";
    html += "\t\t<source src=" + source + "type=\"video/mp4\">\n";
    html += "\t</video>\n";
    html += "\t<figcaption>" + title + "</figcaption>\n";
    // tag
    html += "\t<!-- Created by Aaron's Media Downloader (JS) 12/21/22 -->\n";
    html += "</figure>\n";
    return html;
}

const prompt = promptSync();
const url = prompt("Enter a url: ");
(async() => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    const html = await page.evaluate(() => {
        var src = document.querySelector("#main_video_player_html5_api");
        src = src.getAttribute("src");

        var poster = document.querySelector("img.lazyload");
        poster = poster.getAttribute("src");
        console.log("poster: " + poster);

        var title = document.querySelector(".left h1");
        return 1; //printHTML(title, poster, src);
    });
    console.log(html);
    await browser.close();
})();