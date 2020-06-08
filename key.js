const axios = require("axios");
const sha256 = require("./sha256.js");
var id = "应用id";
var key = "应用密钥";

async function search(query) {
    var s = (new Date).getTime();
    var time = Math.round(new Date().getTime()/1000);
    var str1 = id + (query) + s + time + key;
    var sig = sha256.sha256(str1);
    response = await axios({
        method: 'post',
        url: 'http://openapi.youdao.com/api',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        data:{
            q:query,
            from:"auto",
            to:"auto",
            appKey:id,
            salt:s.toString(),
            sign:sig,
            signType:"v3",
            curtime:time.toString(),
        },
        transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }]
    })
    const json = response.data;
    console.log(json);

    if (response.status != 200) {
        return [{
            title: "错误"
        }];
    }

    if (json.errorCode==0) {
        var trans = {title:json.translation.join(";")};
        var r = [trans];
        if ("basic" in json){
            var basic = json.basic.explains.map(each=>{return {title:each}})
            r = r.concat(basic);
        }
        if ("web" in json){
            var web = json.web.map(each=>{
                    return {title:
                        each.key + ' ' + each.value.join(";")
                        }
                    });
            r = r.concat(web);
        }
        
        // console.log(r);
        return r;
        
        }
    else {
        return [{
            title: "错误，请到issue反馈"
        }];
    }
}
module.exports = {
    search: search
};
// search("testtest").then(function(r){console.log(r)});
