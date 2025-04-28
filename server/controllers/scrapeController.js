
const getHTML = require('html-get');
const browserless = require('browserless')();
const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
]);

const scrapePage = async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'URL is required' });
  
    try {
      const browserContext = browserless.createContext();
      const { html, url: finalUrl } = await getHTML(url, {
        getBrowserless: () => browserContext,
      });
  
      const metadata = await metascraper({ html, url: finalUrl });
      (await browserContext).destroyContext();
  console.log(metadata);
      if (!metadata) {
        return res.status(404).json({ error: 'No metadata found' });
      }
  
      return res.json(metadata);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to scrape metadata' });
    }
  }

  module.exports = {
    scrapePage,
  };

