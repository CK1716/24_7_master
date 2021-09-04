import React from 'react';
import Button from '@material-ui/core/Button';
import * as tmPose from '@teachablemachine/pose';
import styled from "styled-components";
import yoga1 from './image/yoga1.jpg';
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


const URL = "https://teachablemachine.withgoogle.com/models/hebiBqPBS/";
let model=null, webcam=null, ctx=null, maxPredictions=null;

let load=null;


let yoga=null;
let startTime = 0;
let isCheck = false;
let seconds = 0;

const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

var mount = false;

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
        
        if(yoga > 0.7){        
            if(isCheck === false){
                startTime = parseInt(parseInt(timestamp) / 1000);
                isCheck = true;
                // console.log("Start time : " + timestamp);
            }
            seconds = parseInt(parseInt(timestamp) / 1000) - startTime;
        }else{
            isCheck =false;
            seconds = 0;
        }
    }
}

async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    try {
        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        if(prediction[i].className ==="Yoga_01"){
            yoga = parseFloat(prediction[i].probability);
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
        ctx.fillText('Seconds : ' + seconds, 10, 50);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}



class Yoga1 extends React.Component{

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
  }


  render() {

      return (
        <Container>
              {
                  this.state.ismount && <Button variant="contained" color="secondary" onClick={ () => {this.props.history.goBack()} }> 뒤로 버튼 </Button>
              }
              <div style={{fontSize : 50}} id="load">Loading...</div> 
              <Half>
            <div>
              <img src={yoga1} alt="yoga1"/>
              <h2>요가 기본동작 중 Arda Chandrasana 동작입니다.</h2>
              <h3>다음과 같은 자세를 10초이상 유지해주시길 바랍니다.</h3>
              
            </div>
          </Half>
          <Half>  
              <div><canvas id="canvas" /></div>  
          </Half>  
              
              
              
        </Container>
      );
  }
  };

export default Yoga1;