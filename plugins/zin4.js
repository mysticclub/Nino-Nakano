const axios = require('axios');
const EventSource = require('eventsource');
 
const session_hash = Math.random().toString(36).slice(2);
 
const animagine = {
  request: async (prompt) => {
    const data = JSON.stringify({
      "data": [
        prompt,
        "",
        807244162,
        512,
        512,
        7,
        28,
        "Euler a",
        "896 x 1152",
        "(None)",
        "Standard v3.1",
        false,
        0.55,
        1.5,
        true
      ],
      "event_data": null,
      "fn_index": 5,
      "trigger_id": null,
      "session_hash": session_hash  // Use the generated session_hash
    });
 
    const config = {
      method: 'POST',
      url: 'https://cagliostrolab-animagine-xl-3-1.hf.space/queue/join?ref=huntscreens.com',
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'application/json',
        'accept-language': 'id-ID',
        'referer': 'https://aianimegenerator.top/',
        'origin': 'https://aianimegenerator.top',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'priority': 'u=4',
        'te': 'trailers'
      },
      data: data
    };
 
    const api = await axios.request(config);
    return api.data;
  },
  cekStatus: () => {
    return new Promise((resolve, reject) => {
      const eventSource = new EventSource('https://cagliostrolab-animagine-xl-3-1.hf.space/queue/data?session_hash=' + session_hash); // Use the same session_hash
 
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.msg === "process_completed") {
          resolve(data);
          eventSource.close();
        } else if (data.msg === "error") {
          reject(data);
          eventSource.close();
        } else {
          console.log("Event:", data);
        }
      };
 
      eventSource.onerror = (err) => {
        reject(err);
        eventSource.close();
      };
    });
  },
  create: async (prompt) => {
    try {
      const postResponse = await animagine.request(prompt);
      const statusResponse = await animagine.cekStatus();
      return statusResponse;
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
 
// Example usage
const prompt = "Create an anime character";
animagine.create(prompt).then((response) => {
  console.log("Final Response:", response);
});
Advertisement
Add Comment
Please, Sign In to add comment
Advertisement
create new paste  /  syntax languages  /  archive  /  faq  /  tools  /  night mode  /  api  /  scraping api  /  news  /  pro
privacy statement  /  cookies policy  /  terms of service /  security disclosure  /  dmca  /  report abuse  /  contact

Not a member of Pastebin yet?
Sign Up, it unlocks many cool features! 
