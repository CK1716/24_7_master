import React from 'react';
import styled from "styled-components";

import Button from '@material-ui/core/Button';

import ReactPlayer from 'react-player'

import * as tmPose from '@teachablemachine/pose';

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

const Half = styled.div`
  width: 50%;
  float: left;
  display: flex;
	align-items: center;
	justify-content: center;
`;

let ctx = null
let webcam= null;
let mount = false;

async function init(){
  const size = 800;
  const flip = true;
  webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play(); 

  window.requestAnimationFrame(loop);

  const canvas = document.getElementById("canvas");
  canvas.width = size;
  canvas.height = size;
  ctx = canvas.getContext("2d");
  
  mount=true;
}

function loop(timestamp) {
  if(mount){
    webcam.update();
    window.requestAnimationFrame(loop);
    ctx.drawImage(webcam.canvas, 0, 0);
  }
}

// const Dance = ({history}) => {
//   init();

//   const [mount, setmount] = useState(true);

//   useEffect(() => {
//     console.log('컴포넌트가 화면에 나타남');
//     return () => {
//       webcam.stop();
//       console.log('컴포넌트가 화면에서 사라짐');
//     };
//   }, []);

//     return (
//         <Container>
//           <Button variant="contained" color="secondary" onClick={ () => {history.goBack()} }> 뒤로 버튼 </Button>
//           <div>
//             <Half>
//             <ReactPlayer
//               width="100%"
//               padding-top="10px"
//               url='https://www.youtube.com/watch?v=7C2z4GqqS5E' controls/>
//             </Half>
//             <Half>
//             <div><canvas id="canvas" /></div>
//             </Half>
//           </div>
//         </Container>
//     )
// }

class Dance4 extends React.Component{

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
           <div>
             <Half>
             <ReactPlayer
              width="100%"
              padding-top="10px"
              url='https://www.youtube.com/watch?v=u2pFB1dCSo4' controls/>
            </Half>
            <Half>
            <div><canvas id="canvas" /></div>
            </Half>
          </div>
        </Container>
      );
  }
};

export default Dance4;