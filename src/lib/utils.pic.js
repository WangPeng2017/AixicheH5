/* eslint-disable */

/*!
 * https://github.com/whxaxes/node-test/blob/master/server/upload/index_2.html
 */

// 用于压缩图片的canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
// 瓦片canvas
var tCanvas = document.createElement("canvas");
var tctx = tCanvas.getContext("2d");
var maxsize = 200 * 1024; // 图片大小限制为200k

function getImageTypeFromDataUrl(imageurl) {
  var strs = imageurl.split(";");
  var type = strs[0].replace('data:image/', '');
  return type;
}

/**
 * 生成压缩之后的图片数据
 */
export const getCompressPic = function (origin, callback) {
  var type = getImageTypeFromDataUrl(origin);
  if (type === "gif")
    return callback(origin);
  var filesize = origin.length;
  if (typeof Image === 'undefinded' || filesize < maxsize)
    return callback(origin);

  var img = new Image();
  img.src = origin;

  if (img.complete) {
    callback(compress(img, type));
  } else {
    img.onload = function () {
      callback(compress(img, type));
    };
  }
}

function compress(img, type) {
  var width = img.width;
  var height = img.height;

  // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  // var ratio;
  // if ((ratio = width * height / 4000000) > 1) {
  //     ratio = Math.sqrt(ratio);
  //     width /= ratio;
  //     height /= ratio;
  // } else {
  //     ratio = 1;
  // }


  var r;
  if (width < 1280 && height < 1280) {
    r = 1;
  } else if ((width > 1280 || height > 1280) && width / height <= 2) {
    if (width > height) {
      r = width / 1280;
      width /= r;
      height /= r;
    } else {
      r = height / 1280;
      width /= r;
      height /= r;
    }
  } else if (((width > 1280 || height > 1280) && width / height > 2) && (width < 1280 || height < 1280)) {
    r = 1;
  } else if (width > 1280 && height > 1280 && width / height > 2) {
    r = height / 1280;
    width /= r;
    height /= r;
  }




  canvas.width = width;
  canvas.height = height;

  // 铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 如果图片像素大于100万则使用瓦片绘制
  var count;
  if ((count = width * height / 1000000) > 1) {
    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

    // 计算每块瓦片的宽和高
    var nw = ~~(width / count);
    var nh = ~~(height / count);

    tCanvas.width = nw;
    tCanvas.height = nh;

    for (var i = 0; i < count; i++) {
      for (var j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * r, j * nh * r, nw * r, nh * r, 0, 0, nw, nh);

        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }

  // 进行最小压缩
  var ndata = canvas.toDataURL('image/jpeg', 0.5);

  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

  return ndata;
}

/**
 * 图片上传，将base64的图片转成二进制对象，塞进formdata上传
 */
export const upload = function (filename, imageurl, doAfter, webUrl) {
  var strs = imageurl.split(";");
  var type = strs[0].replace('data:image/', '');
  var text = window.atob(strs[1].split(",")[1]);

  try {
    var buffer = new Uint8Array(text.length);
    for (var i = 0; i < text.length; i++) {
      buffer[i] = text.charCodeAt(i);
    }
    var blob = getBlob([buffer], type);

    var formdata = getFormData();
    formdata.append('imagefile', blob);
    formdata.append('filename', filename);

    window.axios.form(webUrl ? webUrl : '默认上传路径', formdata).then(res => {
      doAfter(res);
    })
  } catch (err) {
    doAfter(res);
    alert(err);
  }
}

/**
 * 获取blob对象的兼容性写法
 * @param buffer
 * @param format
 * @returns {*}
 */
function getBlob(buffer, format) {
  try {
    return new Blob(buffer, {
      type: format
    });
  } catch (e) {
    var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
    buffer.forEach(function (buf) {
      bb.append(buf);
    });
    return bb.getBlob(format);
  }
}

/**
 * 获取formdata
 */
function getFormData() {
  var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
    ~navigator.vendor.indexOf('Google') &&
    !~navigator.userAgent.indexOf('Chrome') &&
    navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
  return isNeedShim ? new FormDataShim() : new FormData()
}

/**
 * formdata 补丁, 给不支持formdata上传blob的android机打补丁
 * @constructor
 */
function FormDataShim() {
  console.warn('using formdata shim');
  var o = this,
    parts = [],
    boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
    oldSend = XMLHttpRequest.prototype.send;
  this.append = function (name, value, filename) {
    parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
    if (value instanceof Blob) {
      parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
      parts.push(value);
    } else {
      parts.push('\r\n\r\n' + value);
    }
    parts.push('\r\n');
  };
  // Override XHR send()
  XMLHttpRequest.prototype.send = function (val) {
    var fr,
      data,
      oXHR = this;
    if (val === o) {
      // Append the final boundary string
      parts.push('--' + boundary + '--\r\n');
      // Create the blob
      data = getBlob(parts);
      // Set up and read the blob into an array to be sent
      fr = new FileReader();
      fr.onload = function () {
        oldSend.call(oXHR, fr.result);
      };
      fr.onerror = function (err) {
        throw err;
      };
      fr.readAsArrayBuffer(data);
      // Set the multipart content type and boudary
      this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
      XMLHttpRequest.prototype.send = oldSend;
    } else {
      oldSend.call(this, val);
    }
  }
}
