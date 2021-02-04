module.exports = {
    devServer: {
        port: 8081,
        proxy: {
            "/api_img": {
                target: "http://hn216.api.yesapi.cn/",// 要访问的接口域名
                changeOrigin: true,
                pathRewrite: {
                    '^/api_img': ''
                }
            }
        }
    },
};