## 前言
listary原作者默认使用了金山未公开的翻译接口，今天试了一下好像已经无法访问了。  
因此找了一下有道的，但同样是**未公开**的接口进行翻译，这意味着极不稳定，即可能是明天，也可能是明年将会无法访问。  
~~毕竟官方的接口要付费（摊手 ~~  
官方的接口原来会送体验金！冲了！虽然不知道体验金能花多久，先安排上再说！  


## 结果说明
### 未公开接口
翻译请求会返回大量内容，包括各种类别，例如网络翻译、考试词典等等，这里使用了web端的若干可能结果，即`web_trans`。  
如果对结果不甚满意可以在[test的示例返回结果](./test.json)中寻找想要的结果并注明位置告知我进行修改。  
当前结果中第一行代表原始翻译，其中每一个分号都是一个单独的释义，而原始返回结果中有`line`例句，但当前结果中未包含。

### 官方API接口
基本上有的内容都放进去了，包括基本释义translation，词典释义basic和web解释。剩下的就还有音标和读音地址可选了233。  

## 使用方法
### 未公开接口
将[代码文件normal.js](normal.js)下载至本地，替换`%AppData%\Listary\UserProfile\Extensions\listary-extension-dict\`中的`index.js`文件（可以提前备份一下，虽然源文件现在好像已经没用了），重启listary即可。  

### 官方API接口
将[代码文件key.js](key.js)下载至本地，替换`%AppData%\Listary\UserProfile\Extensions\listary-extension-dict\`中的`index.js`文件，并将[sha256.js](sha256.js)放到同目录（即listary-extension-dict）中，  
将key.js中的id改为自己注册的应用id，key改为自己注册的应用密钥，保存后重启listary即可。