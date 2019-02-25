(function (root, factory) {
  if (root === undefined && window !== undefined) root = window;
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simditor-uploader-button', ["jquery","simditor"], function (a0,b1) {
      return (root['SimditorUploaderButton'] = factory(a0,b1));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simditor"));
  } else {
    root['SimditorUploaderButton'] = factory(root["jQuery"],root["Simditor"]);
  }
}(this, function ($, Simditor) {

var UploaderButton,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

UploaderButton = (function(superClass) {
  extend(UploaderButton, superClass);

  function UploaderButton() {
    return UploaderButton.__super__.constructor.apply(this, arguments);
  }

  UploaderButton.i18n = {
    'zh-CN': {
      uploading: '上传中',
      errorExtension: '不支持的文件扩展，支持',
      errorSize: '文件大小超出，最大支持'
    }
  };

  UploaderButton.prototype.name = '';

  UploaderButton.prototype.needFocus = false;

  UploaderButton.prototype._init = function(opts) {
    this.size = opts.size || 0;
    this.extension = opts.extension || [];
    this.accept = this.extension.map(function(item) {
      return '.' + item;
    }).join(',');
    this.successHandle = opts.successHandle;
    this.errorHandle = this.editor.uploader.opts.uploadError || null;
    $.extend(true, opts.derive.i18n, UploaderButton.i18n);
    return UploaderButton.__super__._init.call(this);
  };

  UploaderButton.prototype.render = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    UploaderButton.__super__.render.apply(this, args);
    return this._initUploader(this.el);
  };

  UploaderButton.prototype._initUploader = function($upload) {
    var $input, createInput, uploadFailed, uploadSuccess;
    if (this.editor.uploader == null) {
      throw new Error('simditor: uploader button depend on uploader');
      return;
    }
    uploadSuccess = (function(_this) {
      return function($elem, filePath) {
        $elem.removeClass('simditor-uploader-loading');
        $elem.text('');
        _this.successHandle($elem, filePath);
        return _this.editor.trigger('valuechanged');
      };
    })(this);
    uploadFailed = (function(_this) {
      return function($elem, errorMsg) {
        var $error, range;
        if (_this.errorHandle) {
          _this.errorHandle(errorMsg, _this.name);
          $elem.remove();
        } else {
          $error = $("<span class='simditor-uploader-error'>" + errorMsg + "</span>");
          $elem.replaceWith($error);
          range = document.createRange();
          range.selectNode($error[0]);
          _this.editor.selection.range(range);
        }
        return _this.editor.trigger('valuechanged');
      };
    })(this);
    $input = null;
    createInput = (function(_this) {
      return function() {
        if ($input) {
          $input.remove();
        }
        $input = $('<input />', {
          type: 'file',
          multiple: true,
          accept: _this.accept
        });
        return $input.appendTo($upload);
      };
    })(this);
    createInput();
    $upload.addClass('simditor-uploader-toolbar');
    $upload.on('click mousedown', 'input[type=file]', function(e) {
      return e.stopPropagation();
    });
    $upload.on('change', 'input[type=file]', (function(_this) {
      return function(e) {
        _this.editor.uploader.upload($input, {
          sign: _this.name,
          params: {
            action: _this.name
          }
        });
        return createInput();
      };
    })(this));
    this.editor.uploader.on('beforeupload', (function(_this) {
      return function(e, file) {
        var $elem;
        if (file.sign !== _this.name) {
          return;
        }
        if (file.elem) {
          $elem = file.elem;
        } else {
          $elem = _this.createElem(file.name).text(_this._t('uploading'));
          file.elem = $elem;
          if (_this.extension.length && (_this.extension.indexOf(file.ext)) === -1) {
            uploadFailed($elem, _this._t('errorExtension') + _this.extension.join(','));
            return false;
          }
          if (_this.size !== 0 && file.size > _this.size * 1024 * 1024) {
            uploadFailed($elem, _this._t('errorSize') + _this.size + 'M');
            return false;
          }
        }
        $elem.addClass('simditor-uploader-loading');
        return $elem.data('file', file);
      };
    })(this));
    this.editor.uploader.on('uploadsuccess', (function(_this) {
      return function(e, file, result) {
        var $elem, error, errorMsg;
        if (file.sign !== _this.name) {
          return;
        }
        $elem = file.elem;
        if (!($elem.hasClass('simditor-uploader-loading') && $elem.parent().length > 0)) {
          return;
        }
        if (typeof result !== 'object') {
          try {
            result = $.parseJSON(result);
          } catch (error) {
            e = error;
            result = {
              success: false
            };
          }
        }
        if (result.success === false) {
          errorMsg = result.msg ? _this._t('uploadFailed') + '：' + result.msg : _this._t('uploadFailed');
          return uploadFailed($elem, errorMsg);
        } else {
          return uploadSuccess($elem, result.file_path);
        }
      };
    })(this));
    return this.editor.uploader.on('uploaderror', (function(_this) {
      return function(e, file, xhr) {
        var $elem, error, errorMsg, result;
        if (file.sign !== _this.name) {
          return;
        }
        if (xhr.statusText === 'abort') {
          return;
        }
        $elem = file.elem;
        if (!($elem.hasClass('simditor-uploader-loading') && $elem.parent().length > 0)) {
          return;
        }
        errorMsg = _this._t('uploadError');
        if (xhr.responseText) {
          try {
            result = $.parseJSON(xhr.responseText);
            errorMsg = result.msg;
          } catch (error) {
            e = error;
            errorMsg = _this._t('uploadError');
          }
        }
        return uploadFailed($elem, errorMsg);
      };
    })(this));
  };

  UploaderButton.prototype._status = function() {
    return this._disableStatus();
  };

  UploaderButton.prototype.createElem = function(fileName) {
    var $elem, range, space;
    if (!this.editor.inputManager.focused) {
      this.editor.focus();
    }
    range = this.editor.selection.range();
    range.deleteContents();
    this.editor.selection.range(range);
    $elem = $('<span></span>');
    space = document.createTextNode('\u00A0');
    range.insertNode(space);
    range.insertNode($elem[0]);
    this.editor.selection.setRangeAfter(space, range);
    this.editor.trigger('valuechanged');
    return $elem;
  };

  return UploaderButton;

})(Simditor.Button);

return UploaderButton;

}));
