const ACCESS_TOKENS = [
  
    //theem token o day nhap xong 1 token thì " , " một cái

];
  
  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
  
  function createAccountHandler(token) {
    let listCollect = [];
    let listDuck = [];
  
    function getTotalEgg() {
      fetch("https://api.quackquack.games/balance/get", {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,vi;q=0.8",
          authorization: "Bearer " + token,
          "if-none-match": 'W/"1a9-I7Onn3jBU9AHo0MlzSY8mMECNvQ"',
          priority: "u=1, i",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          Referer: "https://dd42189ft3pck.cloudfront.net/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      })
        .then((response) => response.json())
        .then((res) => {
          res.data.data.map((item) => {
            if (item.symbol === "EGG") {
              console.log(`Zikdev:  - Đã thu thập ${Number(item.balance)} trứng`);
            }
          });
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    }
  
    function getListReload() {
      fetch("https://api.quackquack.games/nest/list-reload", {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,vi;q=0.8",
          authorization: "Bearer " + token,
          "if-none-match": 'W/"1218-LZvWPzXbQkzjfWJ5mauEo0z3f9c"',
          priority: "u=1, i",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          Referer: "https://dd42189ft3pck.cloudfront.net/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: null,
        method: "GET",
      })
        .then((response) => response.json())
        .then((res) => {
          if (listDuck.length === 0) {
            res.data.duck.map((item) => {
              listDuck.push(item.id);
            });
          }
  
          res.data.nest.map((item) => {
            if (item.type_egg) listCollect.push(item.id);
          });
  
          console.log(`Zikdev: - Số trứng có thể thu thập: ${listCollect.length}`);
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    }
  
    function collect() {
      if (listCollect.length === 0) return setTimeout(collect, 3000);
  
      const egg = listCollect[0];
  
      fetch("https://api.quackquack.games/nest/collect", {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,vi;q=0.8",
          authorization: "Bearer " + token,
          "content-type": "application/x-www-form-urlencoded",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          Referer: "https://dd42189ft3pck.cloudfront.net/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: "nest_id=" + egg,
        method: "POST",
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(`Zikdev: - Thu thập thành công trứng ${egg}`);
          layEgg(egg);
        })
        .catch((error) => {
          console.log("ERROR", error);
          setTimeout(() => {
            collect(egg);
          }, 3000);
        });
    }
  
    function layEgg(egg) {
      const duck = listDuck.random();
      fetch("https://api.quackquack.games/nest/lay-egg", {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,vi;q=0.8",
          authorization: "Bearer " + token,
          "content-type": "application/x-www-form-urlencoded",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          Referer: "https://dd42189ft3pck.cloudfront.net/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: "nest_id=" + egg + "&duck_id=" + duck,
        method: "POST",
      })
        .then((response) => response.json())
        .then((res) => {
          getTotalEgg();
          listCollect.shift();
          setTimeout(collect, 3000);
        })
        .catch((error) => {
          console.log("ERROR", error);
          setTimeout(() => {
            layEgg(egg);
          }, 3000);
        });
    }
  
    getTotalEgg();
    getListReload();
  
    setInterval(() => {
      getListReload();
    }, 10000);
  
    collect();
  }
  
  ACCESS_TOKENS.forEach(token => {
    createAccountHandler(token);
  });
  
