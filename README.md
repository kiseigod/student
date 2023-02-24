# project-v2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 接口地址
地址：[https://www.showdoc.com.cn/jinducasey/8321036098744323]
密码:jinduVIP

### 分数地图接口
地址:[http://192.144.199.210:8080/editor/index.html?chart_id=7Ph0yZtNoJ1JhGDl]

### 项目部署
1、yarn build 打包vue项目
2、打开nginx.conf文件，配置对应的信息
 location / {
            root   D:\Vue_test\project-v2\dist;
            index  index.html index.htm;
            try_files $uri $uri/ @router;    // 解决页面刷新404问题
        }

        location @router{
            rewrite ^.*$ /index.html last;   // Vue项目路由不是真实存在的
        }
3、检查配置文件是否配置成功
```cmd
nginx -t -c D:\nginx-1.23.1\conf\nginx.conf
start nginx  // 运行nginx
