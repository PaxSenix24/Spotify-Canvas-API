const express = require('express');
const axios = require('axios');
const getCanvases = require('./src/_canvasApi.js');

const app = express();
const port = 3000

app.listen(port, function () {
    console.log("listening on port ", port)
    if (port == 3000) { console.log('running on loca http://localhost:3000') }
});

app.get('/spotify', async function (req, res) {
    let id = req.query.id
    let canvasToken = getCanvasToken();
    let canvasResponse = await getCanvases(id, await canvasToken);

    res.json({ data: canvasResponse });

});

function getCanvasToken() {
  const options = {
    url: 'https://open.spotify.com/get_access_token?reason=transport&productType=web_player',
    method: 'GET',
    headers: {
      'Cookie': 'sp_dc=AQD4YeKbaH8QVg_6Ox7VD5qjN5eHNRuhJw9c3TvnN-lZokwQoQwtt_2uyfMMB36v8VC_EtrChmpFMemkBWLcDp4iwjnFb_BIcDyx_Va-t8xAqE247A3TKJewWDfN_xwlPYHs4PrkZzW1GB3eeyKlpP_5fD2_y3k'
    }
  };
  return axios.request(options)
    .then(response => {
      if (response.statusText !== 'OK') {
        console.log(`ERROR ${CANVAS_TOKEN_URL}: ${response.status} ${response.statusText}`);
        if (response.data.error) {
          console.log(response.data.error);
        }
      } else {
        return response.data.accessToken;
      }
    })
    .catch(error => console.log(`ERROR ${CANVAS_TOKEN_URL}: ${error}`));
}
