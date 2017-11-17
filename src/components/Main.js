require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');

//获取图片数据
var imageDatas = require('../data/imagedata.json');

//将图片名信息转为URL信息
function genImageURL(imageDataArr){
  for(var i = 0, j = imageDataArr.lenth; i < j; i++){
    var singleImageData = imageDataArr[i];

    singleImageData.imageURL = require('../images/' + singleImageData.filename);
    imageDataArr[i] = singleImageData;
  }
  return imageDataArr;
}

imageDatas = genImageURL(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
          <section className="img-sec">
          </section>
          <nav className="controller-nav">
          </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
