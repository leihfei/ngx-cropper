import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";

/**
 * Created by 雷洪飞 on 2018/1/12.
 * @function:
 */


@Component({
  selector: 'app-lnlr-cropper',
  templateUrl: 'cropper.component.html',
  styleUrls: ['cropper.component.css'],
})
export class CropperComponent implements OnInit, OnChanges {
  // url
  URL = null;
  // 上传图片
  $inputImage = null;
  // 图片
  $image = null;
  // 上传图片的后缀
  uploadedImageType = 'image/jpeg';
  // 上传图片的url
  uploadedImageURL;
  // 定义一个cropper操作
  options = null;
  // 定义一个下载文件
  $download = null;
  // 原始文件的路径
  originalImageURL = null;
  // 下载图片长宽高
  @Input()
  dataHeight = 0;

  @Input()
  dataWidth = 0;
  // 位于原始图片的位置
  dataX: number;
  dataY: number;
  // 旋转角度
  dataRotate: number;
  // 图片位置变换
  dataScaleX: number;
  dataScaleY: number;
  // 暴露出去的base64编码
  @Output() imageData: EventEmitter<any> = new EventEmitter();

  // 输入的图片
  @Input() srcImage;
  /**
   * 类型： Boolean
   * 默认： true
   * 通过拖动可以调整裁剪框的大小。
   * @type {boolean}
   */
  @Input()
  cropBoxResizable: boolean = false;

  /**
   * 定义裁剪的视图模式
   * 如果设置viewMode为0，裁剪框可以在画布之外延伸，而值1，2或者3将裁剪框限制为画布的大小。甲viewMode的2或3将另外限制画布到容器上。请注意，如果画布和容器的比例相同，则2和之间没有区别3
   * default:0 无限制
   * 0： 无限制
   * 1：限制裁剪框不超过画布的大小。
   * 2：限制最小画布大小以适应容器。如果画布和容器的比例不同，则最小画布将被其中一个维度中的额外空间包围。
   * 3：限制最小画布尺寸以填充容器。如果画布和容器的比例不同，容器将无法将整个画布放在其中一个尺寸上。
   * @type {number}
   */
  @Input()
  viewMode: number = 0;

  /**
   * 类型： String
   *  默认： 'crop'
   *  选项：
   *  'crop'：创建一个新的裁剪框
   *  'move'：移动画布
   *  'none'：什么做什么
   * @type {string}
   */
  @Input()
  dragMode: string = 'crop';

  /**
   *  图片比例
   *  类型： number
   *  默认值：NaN
   */
  @Input()
  aspectRatio = 2 / 3;

  /**
   *  根据页面大小调整大小
   *  默认值：true
   *  类型：Boolean
   * @type {boolean}
   */
  @Input()
  responsive: boolean;

  /**
   * restore
   * 类型： Boolean
   * 默认： true
   * 调整窗口大小后还原裁剪区域。
   */
  @Input()
  restore: boolean;

  /**
   * checkCrossOrigin
   * 类型： Boolean
   * 默认： true
   * 检查当前图像是否是一个跨源图像。
   * 如果是，克隆镜像时，crossOrigin会将一个属性添加到克隆的镜像元素中，时间戳将被添加到src属性中以重新加载源镜像，以避免浏览器缓存错误。
   * 通过添加crossOrigin属性图像将停止添加时间戳到图像url，并停止重新加载图像。
   * 如果图像crossOrigin属性的值是"use-credentials"，则当通过XMLHttpRequest读取图像数据时，withCredentials属性将被设置为true。
   * @type {boolean}
   */
  @Input()
  checkCrossOrigin: boolean;

  /**
   * 类型： Boolean
   * 默认： true
   * 检查当前图像的Exif方向信息。
   * 更确切地说，读取旋转或翻转图像的方向值，然后使用1（默认值）覆盖方向值，以避免iOS设备出现一些问题（＃120，＃509）。
   * 要求同时设置rotatable和scalable选项true。
   * 注意：不要总是相信这一点，因为一些JPG图像有不正确（不标准）的方向值。
   * 需要键入数组支持（IE 10+）。
   */
  @Input()
  checkOrientation: boolean;

  /**
   * modal
   * 类型： Boolean
   * 默认： true
   * 在图像上方和裁切框下方显示黑色模式。
   * @type {boolean}
   */
  @Input()
  modal: boolean;

  /**
   * 类型： Boolean
   * 默认： true
   * 在裁剪框上方显示虚线。
   */
  @Input()
  guides: boolean;

  /**
   * 类型： Boolean
   * 默认： true
   * 在裁切框上方显示中心指示器。
   */
  @Input()
  center: boolean;

  /**
   * 类型： Boolean
   * 默认： true
   * 在裁切框上方显示白色模式（突出显示裁切框）。
   */
  @Input()
  highlight: boolean;


  /**
   * 类型： Boolean
   * 默认： true
   * 显示容器的网格背景。
   */
  @Input()
  background: boolean;

  /**
   * 类型： Boolean
   *  默认： true
   * 初始化时自动裁剪图像。
   */
  @Input()
  autoCrop: boolean;

  /**
   * 类型： Number
   * 默认:( 0.880％的图像）
   * 介于0和1之间的数字。定义自动裁剪区域大小（百分比）。
   */
  @Input()
  autoCropArea: number;

  /**
   * 类型： Boolean
   * 默认： true
   * 启用移动图像。
   */
  @Input()
  movable: boolean;

  /**
   * 类型： Boolean
   * 默认： true
   * 启用旋转图像。
   */
  @Input()
  rotatable: boolean;

  /**
   * 类型： Boolean
   * 默认： true
   * 启用缩放图像。
   */
  @Input()
  scalable: boolean;

  /**
   * 类型： Boolean
   * 默认： true
   * 启用缩放图像。
   */
  @Input()
  zoomable: boolean;

  /**
   * 类型： Boolean
   * 认： true
   * 用通过拖动触摸来缩放图像。
   */
  @Input()
  zoomOnTouch: boolean;

  /**
   *类型： Boolean
   * 默认： true
   * 启用通过滚动鼠标缩放图像。
   */
  @Input()
  zoomOnWheel: boolean;

  /**
   *类型： Number
   * 默认： 0.1
   * 通过滚轮鼠标缩放图像时定义缩放比率。
   */
  @Input()
  wheelZoomRatio: boolean;

  /**
   * 类型： Boolean
   * 默认： true
   * 启用通过拖动来移动裁剪框。
   */
  @Input()
  cropBoxMovable: boolean;

  /**
   * 类型： Boolean
   * 默认： true
   * 当在裁剪器上单击两次时，可以在“裁剪”和“移动”之间切换拖动模式
   */
  @Input()
  toggleDragModeOnDblclick: boolean;

  /**
   * 类型：Number
   * 默认：200
   * 容器最小宽度
   */
  @Input()
  minContainerWidth: number;

  /**
   * 类型：Number
   * 默认：200
   * 容器最小高度
   */
  @Input()
  minContainerHeight: number;

  /**
   * 类型：Number
   * 默认：0
   * 画布最小宽度
   */
  @Input()
  minCanvasWidth: number;

  /**
   * 类型：Number
   * 默认：0
   * 画布最小高度
   */
  @Input()
  minCanvasHeight: number;

  /**
   * 类型：Number
   * 默认：0
   * 裁剪框最小宽度
   * 注意：这个尺寸是相对于页面而不是图片。
   */
  @Input()
  minCropBoxWidth: number;

  /**
   * 类型：Number
   * 默认：0
   * 裁剪框最小高度
   * 注意：这个尺寸是相对于页面而不是图片。
   */
  @Input()
  minCropBoxHeight: number;

  ngOnInit() {
    console.log('join cropper');
    this.init();
    this.initKeyboard();
    this.inputImageUpload();

    // 进行比例设置
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataHeight === 0) {
      this.dataHeight = 567;
    }
    if (this.dataWidth === 0) {
      this.dataWidth = 196;
    }
    console.log(this.aspectRatio);
  }


  /**
   * 初始化配置
   */
  init() {
    // 对上传图片赋值
    this.$inputImage = $('#inputImage');
    // 对原始图片赋值
    this.$image = $('#image');
    this.originalImageURL = this.$image.attr('src');
    // 对url赋值
    this.URL = window.URL;
    this.initValue();
  }

  initValue() {
    this.$download = $('#download');
    let self = this;
    this.options = {
      aspectRatio: this.aspectRatio,
      preview: '.img-preview',
      cropBoxResizable: this.cropBoxResizable,
      viewMode: this.viewMode,
      dragMode: this.dragMode,
      responsive: this.responsive,
      restore: this.restore,
      checkCrossOrigin: this.checkCrossOrigin,
      checkOrientation: this.checkOrientation,
      modal: this.modal,
      guides: this.guides,
      center: this.center,
      highlight: this.highlight,
      autoCrop: this.autoCrop,
      background: this.background,
      autoCropArea: this.autoCropArea,
      movable: this.movable,
      rotatable: this.rotatable,
      zoomOnTouch: this.zoomOnTouch,
      zoomable: this.zoomable,
      scalable: this.scalable,
      zoomOnWheel: this.zoomOnWheel,
      wheelZoomRatio: this.wheelZoomRatio,
      cropBoxMovable: this.cropBoxMovable,
      toggleDragModeOnDblclick: this.toggleDragModeOnDblclick,
      minContainerWidth: this.minContainerWidth,
      minContainerHeight: this.minContainerHeight,
      minCanvasWidth: this.minCanvasWidth,
      minCanvasHeight: this.minCanvasHeight,
      minCropBoxWidth: this.minCropBoxWidth,
      minCropBoxHeight: this.minCropBoxHeight,
      crop: (e) => {
        self.dataHeight = Math.round(e.height);
        self.dataWidth = Math.round(e.width);

        self.dataX = Math.round(e.x);
        self.dataY = Math.round(e.y);

        self.dataRotate = Math.round(e.rotate);
        self.dataScaleX = Math.round(e.scaleX);
        self.dataScaleY = Math.round(e.scaleY);
      },
    }
    ;
    this.$image.cropper(this.options);
  }


  /**
   * 初始化上下左右按钮进行图片滑动
   */
  initKeyboard() {
    // Keyboard
    $(document.body).on('keydown', (e) => {
      if (!this.$image.data('cropper')) {
        return;
      }
      switch (e.which) {
        case 37:
          e.preventDefault();
          this.$image.cropper('move', -1, 0);
          break;

        case 38:
          e.preventDefault();
          this.$image.cropper('move', 0, -1);
          break;

        case 39:
          e.preventDefault();
          this.$image.cropper('move', 1, 0);
          break;

        case 40:
          e.preventDefault();
          this.$image.cropper('move', 0, 1);
          break;
      }
    });
  }

  /**
   * 上传新图片
   */
  inputImageUpload() {
    if (this.URL) {
      const files = ( <HTMLInputElement>$('#inputImage')[0] ).files;
      let file;
      if (!this.$image.data('cropper')) {
        return;
      }
      if (files && files.length) {
        file = files[0];
        if (/^image\/\w+$/.test(file.type)) {
          this.uploadedImageType = file.type;
          if (this.uploadedImageURL) {
            URL.revokeObjectURL(this.uploadedImageURL);
          }
          this.uploadedImageURL = URL.createObjectURL(file);
          this.$image.cropper('destroy').attr('src', this.uploadedImageURL).cropper(this.options);
          this.$inputImage.val('');
        } else {
          window.alert('请选择一个图片文件!');
        }
      }
    } else {
      this.$inputImage.prop('disabled', true).parent().addClass('disabled');
    }
    // 选择图片之后再次初始化
    this.init();
  }

  /**
   * 操作
   * @param method 方法名
   * @param option 参数
   */
  option(method, option) {
    this.$image.cropper(method, option);
  }

  /**
   * 操作，只不过没有参数
   * @param method
   */
  action(method) {
    this.$image.cropper(method);
  }

  /**
   * 得到画布
   * @param height
   * @param width
   */
  getCanvas(method, heights: number, widths: number) {
    const result = this.$image.cropper(method, {height: heights, width: widths, fillColor: '#fff'});
    switch (method) {
      case 'rotate':
        this.$image.cropper('crop');
        break;
      case 'getCroppedCanvas':
        if (result) {
          // Bootstrap's Modal
          $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
          if (!this.$download.hasClass('disabled')) {
            this.$download.attr('href', result.toDataURL(this.uploadedImageType));
          }
        }
        break;
      case 'destroy':
        if (this.uploadedImageURL) {
          URL.revokeObjectURL(this.uploadedImageURL);
          this.uploadedImageURL = '';
          this.$image.attr('src', this.originalImageURL);
        }
        break;
    }
  }

  /**
   * 操作数据
   * @param method
   * @param target
   */
  optionData(method: string, target) {
    let $target;
    let $option;
    if (typeof target !== 'undefined') {
      $target = $(target);
      // 假如方法是以set开头，就设置值
      if (method.startsWith('set')) {
        try {
          $option = JSON.parse($target.val());
        } catch (e) {
          // console.log(e.message);
        }
      }
      const result = this.$image.cropper(method, $option);
      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          //  console.log(e.message);
        }
      }
    }
  }

  /**
   * 用相对偏移移动画布（图像包装器）
   * @param offsetX
   * @param offsetY
   */
  move(offsetX, offsetY) {
    this.$image.cropper('move', offsetX, offsetY);
  }

  /**
   * 以相对度旋转图像
   * @param degree 旋转角度
   */
  rotate(degree) {
    this.$image.cropper('rotate', degree);
  }

  /**
   * 得到图片，并且关闭弹窗
   */
  getImageAndClose() {
    const result = this.$image.cropper('getCroppedCanvas', {fillColor: '#fff'});
    // 将base64暴露出去，然后父组件进行接收该图片
    this.imageData.emit(result.toDataURL(this.uploadedImageType));
  }

  /**
   * 得到图片，并且关闭弹窗
   */
  downLoad() {
    const result = this.$image.cropper('getCroppedCanvas', {fillColor: '#fff'});
    this.$download = result.toDataURL(this.uploadedImageType);
  }
}
