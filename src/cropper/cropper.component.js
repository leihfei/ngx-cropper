var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from "@angular/core";
var CropperComponent = (function () {
    function CropperComponent() {
        this.URL = null;
        this.$inputImage = null;
        this.$image = null;
        this.uploadedImageType = 'image/jpeg';
        this.options = null;
        this.$download = null;
        this.originalImageURL = null;
        this.dataHeight = 0;
        this.dataWidth = 0;
        this.imageData = new EventEmitter();
        this.aspectRatio = 2 / 3;
    }
    CropperComponent.prototype.ngOnInit = function () {
        console.log('join cropper');
        this.init();
        this.initKeyboard();
        this.inputImageUpload();
    };
    CropperComponent.prototype.ngOnChanges = function (changes) {
        if (this.dataHeight === 0) {
            this.dataHeight = 567;
        }
        if (this.dataWidth === 0) {
            this.dataWidth = 196;
        }
        console.log(this.aspectRatio);
    };
    CropperComponent.prototype.init = function () {
        this.$inputImage = $('#inputImage');
        this.$image = $('#image');
        this.originalImageURL = this.$image.attr('src');
        this.URL = window.URL;
        this.initValue();
    };
    CropperComponent.prototype.initValue = function () {
        this.$download = $('#download');
        var self = this;
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
            crop: function (e) {
                self.dataHeight = Math.round(e.height);
                self.dataWidth = Math.round(e.width);
                self.dataX = Math.round(e.x);
                self.dataY = Math.round(e.y);
                self.dataRotate = Math.round(e.rotate);
                self.dataScaleX = Math.round(e.scaleX);
                self.dataScaleY = Math.round(e.scaleY);
            },
        };
        this.$image.cropper(this.options);
    };
    CropperComponent.prototype.initKeyboard = function () {
        var _this = this;
        $(document.body).on('keydown', function (e) {
            if (!_this.$image.data('cropper')) {
                return;
            }
            switch (e.which) {
                case 37:
                    e.preventDefault();
                    _this.$image.cropper('move', -1, 0);
                    break;
                case 38:
                    e.preventDefault();
                    _this.$image.cropper('move', 0, -1);
                    break;
                case 39:
                    e.preventDefault();
                    _this.$image.cropper('move', 1, 0);
                    break;
                case 40:
                    e.preventDefault();
                    _this.$image.cropper('move', 0, 1);
                    break;
            }
        });
    };
    CropperComponent.prototype.inputImageUpload = function () {
        if (this.URL) {
            var files = $('#inputImage')[0].files;
            var file = void 0;
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
                }
                else {
                    window.alert('请选择一个图片文件!');
                }
            }
        }
        else {
            this.$inputImage.prop('disabled', true).parent().addClass('disabled');
        }
        this.init();
    };
    CropperComponent.prototype.option = function (method, option) {
        this.$image.cropper(method, option);
    };
    CropperComponent.prototype.action = function (method) {
        this.$image.cropper(method);
    };
    CropperComponent.prototype.getCanvas = function (method, heights, widths) {
        var result = this.$image.cropper(method, { height: heights, width: widths, fillColor: '#fff' });
        switch (method) {
            case 'rotate':
                this.$image.cropper('crop');
                break;
            case 'getCroppedCanvas':
                if (result) {
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
    };
    CropperComponent.prototype.optionData = function (method, target) {
        var $target;
        var $option;
        if (typeof target !== 'undefined') {
            $target = $(target);
            if (method.startsWith('set')) {
                try {
                    $option = JSON.parse($target.val());
                }
                catch (e) {
                }
            }
            var result = this.$image.cropper(method, $option);
            if ($.isPlainObject(result) && $target) {
                try {
                    $target.val(JSON.stringify(result));
                }
                catch (e) {
                }
            }
        }
    };
    CropperComponent.prototype.move = function (offsetX, offsetY) {
        this.$image.cropper('move', offsetX, offsetY);
    };
    CropperComponent.prototype.rotate = function (degree) {
        this.$image.cropper('rotate', degree);
    };
    CropperComponent.prototype.getImageAndClose = function () {
        var result = this.$image.cropper('getCroppedCanvas', { fillColor: '#fff' });
        this.imageData.emit(result.toDataURL(this.uploadedImageType));
    };
    CropperComponent.prototype.downLoad = function () {
        var result = this.$image.cropper('getCroppedCanvas', { fillColor: '#fff' });
        this.$download = result.toDataURL(this.uploadedImageType);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CropperComponent.prototype, "dataHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CropperComponent.prototype, "dataWidth", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CropperComponent.prototype, "imageData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CropperComponent.prototype, "srcImage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "cropBoxResizable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CropperComponent.prototype, "viewMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CropperComponent.prototype, "dragMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CropperComponent.prototype, "aspectRatio", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "responsive", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "restore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "checkCrossOrigin", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "checkOrientation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "modal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "guides", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "center", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "highlight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "background", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "autoCrop", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CropperComponent.prototype, "autoCropArea", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "movable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "rotatable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "scalable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "zoomable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "zoomOnTouch", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "zoomOnWheel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "wheelZoomRatio", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "cropBoxMovable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CropperComponent.prototype, "toggleDragModeOnDblclick", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CropperComponent.prototype, "minContainerWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CropperComponent.prototype, "minContainerHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CropperComponent.prototype, "minCanvasWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CropperComponent.prototype, "minCanvasHeight", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CropperComponent.prototype, "minCropBoxWidth", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CropperComponent.prototype, "minCropBoxHeight", void 0);
    CropperComponent = __decorate([
        Component({
            selector: 'app-lnlr-cropper',
            templateUrl: 'cropper.component.html',
            styleUrls: ['cropper.component.css'],
        })
    ], CropperComponent);
    return CropperComponent;
}());
export { CropperComponent };
//# sourceMappingURL=cropper.component.js.map