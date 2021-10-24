import React from 'react';
import styled from "styled-components"


const Story = () =>{
    return(
        <Container>
           2016250010 김지욱    
           2019250073 최규현        
           2016250056 황동근 
        </Container>
    )
}
const Container = styled.div`
    position: absolute;
    right: 1;
    width: 800px;
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: end  ;
    width:45%;
    color: white;
    font-style: italic;
    font-size: 10px;
    font-weight: 600;
`;

export default Story;