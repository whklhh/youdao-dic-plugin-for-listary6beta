const axios = require("axios");

async function search(query) {
    response = await axios({
        url: 'http://dict.youdao.com/jsonapi',
        params:{
            jsonversion: 2,
            client: 'mobile',
            q: query,
            dicts: '{web_trans}',
        }
    })
    const json = response.data;
    // console.log(json);

    if (response.status != 200) {
        return [{
            title: "错误"
        }];
    }

    if (json.web_trans["web-translation"]) {
        return json.web_trans["web-translation"].map(each=>{
            return {title:
                each.key + ' ' + each.trans.map(
                    tran=>{
                        return tran.value;
                    }).join(";")
                }
            }
            );
    }
    else {
        return [{
            title: "没有找到相关结果"
        }];
    }
}
module.exports = {
    search: search
};
search("test").then(function(r){console.log(r)});
