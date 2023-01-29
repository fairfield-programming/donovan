const fs = require('fs');
const path = require('path');

function generateSitemaps(pageContents) {
    
    if (!fs.existsSync(path.join(process.cwd(), 'public', 'sitemap')))
        fs.mkdirSync(path.join(process.cwd(), 'public', 'sitemap'))

    const cleanedPaths = Object.keys(pageContents).filter(i => i.endsWith('index.html')).map(element => {
    
        return `/${element.replace('index.html', '')}`

    });

    generateSitemap(0, cleanedPaths);
    generateSitemapIndex(['/sitemap/sitemap-0.xml'])

}

function generateSitemap(index, paths) {

    const contents = generateSitemapContents(paths);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap', `sitemap-${index}.xml`), contents);

}

function generateSitemapContents(paths) {

    const urls = paths.map(i => {

        return [
            `<url>`,
            `<loc>${i}</loc>`,
            `<lastmod>${new Date().toISOString()}</lastmod>`,
            `</url>`
        ].join('')

    })

    return [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
        ...urls,
        `</urlset>`
    ].join('');

}

function generateSitemapIndex(indices) {

    const contents = generateSitemapIndexContents(indices);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap', 'sitemap-index.xml'), contents);

}

function generateSitemapIndexContents(indices) {

    const sitemaps = indices.map(i => {

        return [
            `<sitemap>`,
            `<loc>${i}</loc>`,
            `<lastmod>${new Date().toISOString()}</lastmod>`,
            `</sitemap>`,
        ].join('');

    })

    return [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
        ...sitemaps,
        `</sitemapindex>`
    ].join('');

}

module.exports.generateSitemaps = generateSitemaps;