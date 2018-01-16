# Ng4ImageCropper

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

# 描述
利用cropper 制作图片截图插件

# 样式
![example](https://github.com/leihfei/ngx-cropper/raw/master/cropper-example.png)

# 使用
 npm install --save lnlr-cropper@latest

在appModule中引入
```angular2html
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CropperModule} from 'lnlr-cropper/index';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CropperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
```

在页面上使用
```angular2html

<app-lnlr-cropper [aspectRatio]="NaN" [srcImage]=""></app-lnlr-cropper>
```

在使用过过程中提供了点击勾勾之后会返回一个true,用于在使用时关闭对话框之类，并且数据会以base64的形式绑定到给定的数据中。


# 属性简介
  - cropBoxResizable  裁剪框大小调整
  - viewMode 裁剪视图模式
  - aspectRatio  图片裁剪比例  默认2/3
  - responsive  根据页面调整大小
  。。。。。。
  
  
###### 无api


