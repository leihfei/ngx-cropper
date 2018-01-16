# Ng4ImageCropper

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

# 描述
利用cropper 制作图片截图插件

# 样式
![example](https://github.com/leihfei/ngx-cropper/cropper-example.png

# 使用
 npm install --save ngx-cropper@latest

在appModule中引入
```angular2html
import {CropperModule} from 'ng4-image-cropper/index';

CropperModule
```

在页面上使用
```angular2html

<app-lnlr-cropper [aspectRatio]="NaN" [srcImage]=""></app-lnlr-cropper>
```

在使用过过程中提供了点击勾勾之后会返回一个true,用于在使用时关闭对话框之类，并且数据会以base64的形式绑定到给定的数据中。


