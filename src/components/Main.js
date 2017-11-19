require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
//import ReactDOM from 'react-dom';


//获取图片数据
let imageDatas = require('../data/imagedata.json');

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

function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

class ImgFigure extends React.Component{
  render(){

    var styleObj =  {};

    //如果指定了这张图片的位置，则使用
    if (this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }

    var imgURL=('../images/' + this.props.data.filename);

    return(
      <figure className="img-figure" style={styleObj} ref="figure">
        <img className='img-back' src={imgURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
}

class AppComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      imgsArrangeArr:[
        /*{
          pos:{
            left:'0',
            top:'0'
          }
        }*/
      ]
    };

    this.Constant = {
      centerPos:{
        left:0,
        right:0
      },
      hPosRange:{   //水平方向取值范围
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{   //垂直方向取值范围
        x:[0,0],
        topY:[0,0]
      }
    }

    /*return{
      imgsArrangeArr:[
        {
          pos:{
            left:'0',
            top:'0'
          }
        }
      ]
    };*/
  }

  //组件加载以后为每张图片计算其位置的范围
  componentDidMount(){
      //拿到舞台的大小
      var stageDOM = this.refs.stage,
          stageW = stageDOM.scrollWidth,
          stageH = stageDOM.scrollHeight,
          halfStageW = Math.ceil(stageW / 2),
          halfStageH = Math.ceil(stageH / 2);

      //拿到一个imgFigure的大小
      var imgFigureDOM = this.refs.imgFigure0.refs.figure,
          imgW = imgFigureDOM.scrollWidth,
          imgH = imgFigureDOM.scrollHeight,
          halfImgW = Math.ceil(imgW / 2),
          halfImgH = Math.ceil(imgH / 2);

      //计算中心图片的位置点
      this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      }

      this.Constant.hPosRange.leftSecX[0] = -halfImgW;
      this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
      this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
      this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
      this.Constant.hPosRange.y[0] = -halfImgH;
      this.Constant.hPosRange.y[1] = stageH - halfImgH;

      this.Constant.vPosRange.topY[0] = -halfImgH;
      this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
      this.Constant.vPosRange.x[0] = halfStageW - imgW;
      this.Constant.vPosRange.x[1] = halfStageW;

      this.rearrange(0);
  }

  center(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  }

  //重新布局所有图片
  rearrange(centerIndex){
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取
        topImgSpliceIndex = 0,

        //中心图片的状态
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        imgsArrangeCenterArr[0] = centerPos;

        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.lenth - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        //布局上侧状态
        imgsArrangeTopArr.forEach(function(value,index){
          imgsArrangeTopArr[index].pos = {
            top:getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
            left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
          }
        });

        for(var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
          var hPosRangeLORX = null;

          // 前半部分布局左边， 右半部分布局右边
          if (i < k) {
              hPosRangeLORX = hPosRangeLeftSecX;
            } else {
              hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i].pos = {
              top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
              left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            }
        }

      if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
          imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
      }

      imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

      this.setState({
          imgsArrangeArr: imgsArrangeArr
      });
  }


  render() {

    var controllerUnits=[],
        imgFigures=[];

    imageDatas.forEach(function(value, index){

      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top:0
          }
        }
      }
      imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}
       key={index} arrange={this.state.imgsArrangeArr[index]}/>);
    }.bind(this));

    return (
      <section className="stage" ref="stage" id="stage">
          <section className="img-sec">
            {imgFigures}
          </section>
          <nav className="controller-nav">
            {controllerUnits}
          </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
