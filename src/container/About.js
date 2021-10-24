import React from 'react';
import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Content from "./Content";
import Story from "./Story";
import Button from '@material-ui/core/Button';

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
    url(https://mblogthumb-phinf.pstatic.net/20140925_3/ilomarta_1411621791293SMbJl_JPEG/10259044973_76ef605311_o.jpg?type=w2);
  background-size: cover;
`;

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

const About = ( { history } ) => {
    return (
        <div>
            <Container>
            <h3> <WhiteTextTypography><h1>About Page</h1></WhiteTextTypography> </h3>
            <Button variant="contained" color="secondary" onClick={ () => {history.goBack()} }> 뒤로 버튼 </Button>
            <Content></Content>
            </Container> 
            <Story></Story>
        </div>
    );    
}

export default About;