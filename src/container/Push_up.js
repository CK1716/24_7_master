import React from 'react';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import * as tmPose from '@teachablemachine/pose';
import image1 from './image/image1.jpg';
const Half = styled.div`
  width: 50%;
  float: left;
  display: flex;
	align-items: center;
	justify-content: center;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to right,
      rgba(20, 20, 20, 0.1) 10%,
      rgba(20, 20, 20, 0.7) 70%,
      rgba(20, 20, 20, 1)
    ),
    url(https://hamonikr.org/files/attach/images/118/312/070/091a9004527320054613ddcdbda75b46.jpg);
  background-size: cover;
`;

const URL = "https://teachablemachine.withgoogle.com/models/azqsp2tS5/";
let model=null, webcam=null, ctx=null, maxPredictions=null;
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

var mount = false;
let load=null;

let count= 0;
let stand = "Stand";

async function init() {
  console.log("call init")
  model = await tmPose.load(modelURL, metadataURL);

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // Note: the pose library adds a tmPose object to your window (window.tmPose)
  
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const size = 800;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play(); 
  
  window.requestAnimationFrame(loop);
      
  // append/get elements to the DOM
  const canvas = document.getElementById("canvas");
  canvas.width = size;
  canvas.height = size;
  ctx = canvas.getContext("2d");
  // set font style
  ctx.font = "48px serif";


  load = document.getElementById("load");
  load.innerHTML = "";

  mount =true;
  console.log("mount is " + mount);
}

async function loop(timestamp) {
  if(mount){
      webcam.update(); // update the webcam frame
      await predict();
      window.requestAnimationFrame(loop);
  }
  // console.log("currnent time : " + timestamp);
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  try {
      const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);

  for (let i = 0; i < maxPredictions; i++) {
      if(prediction[i].className ==="StandBy" && prediction[i].probability > 0.8){
          if(stand === "Push Up"){
              stand = "StandBy";
              count++;
          }
      }
      if(prediction[i].className ==="Push Up" && prediction[i].probability > 0.8){
          stand = "Push Up";
      }
  }
  
  // finally draw the poses
  drawPose(pose);
    } catch (e) {
      console.error("it cant solve, and i dont wanna care about shit");
    }

}

function drawPose(pose) {
  if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw font
      ctx.fillText('Count : ' + count, 10, 50);
      // draw the keypoints and skeleton
      if (pose) {
          const minPartConfidence = 0.5;
          tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
          tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
  }
}

class push_up extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      ismount : false
    };
    this.forBack = this.forBack.bind(this);
  }

  async forBack(){
      await init();
      this.setState({
          ismount : true
      })
      console.log("forBack done")
  }

  componentDidMount(){
      this.forBack();
  }

  componentWillUnmount(){
      if(webcam!=null){
          webcam.stop();
      }
      mount=false;
      count=0;
  }


  render() {

      return (
        <Container>
         
              {
                  this.state.ismount && <Button variant="contained" color="secondary" onClick={ () => {this.props.history.goBack()} }> 뒤로 버튼 </Button>
              }
              <div style={{fontSize : 50}} id="load">Loading...</div> 
          <Half>
            <div align = "left">
              <img src={image1} alt="image1"/>
              <h2>운동 방법</h2>
              <h3>1. 팔과 다리를 살짝 벌린 플랭크 자세로 시작하며, 머리부터 발뒤꿈치까지 평행을 유지한다.</h3>
              <h3>2. 천천히 팔꿈치를 굽힌다. 상체와 하체의 직선을 유지하며 몸과 바닥의 수평을 이룬다.</h3>
              <h3>3. 숨을 내쉬면서 천천히 원래의 플랭크 위치로 돌아간다. 머리부터 발뒤꿈치까지의 평행을 유지한다.</h3>
              <h3>4. 1~3번을 15회에서 20회 가량 반복한다.</h3>
            </div>
          </Half>
          <Half>  
              <div><canvas id="canvas" /></div>  
          </Half>   
        </Container>
      );
  }
};


export default push_up;