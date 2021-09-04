import React from 'react';

import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import { Link as RouterLink } from 'react-router-dom';

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

const Tae = ({history}) => {
  const classes = useStyles();
    
    const images = [
    {  
      url: 'http://thub.kumsung.co.kr/upfiles/editor/201310/g88h8m9quc08usiu7hsiggjod3.jpg',
      title:'Tae1',
      siteurl: '/Tae1',
      width: '50%',
    },
    {
      url: 'http://thub.kumsung.co.kr/upfiles/editor/201310/6qr2fgpkhuk261gnu2dmncsvs5.jpg',
      title: 'Tae2',
      siteurl: '/Tae2',
      width: '50%',
    },
    {
      url: 'http://thub.kumsung.co.kr/upfiles/editor/201310/8t173qglrn4j2cr83isufh72i1.jpg',
      title: 'Tae3',
      siteurl: '/Tae3',
      width: '50%',
    },
    {
      url: 'https://blog.kakaocdn.net/dn/bLM2uK/btqDEF48XEZ/MWPLd6nb0xr11Ss3kYP9k0/img.jpg',
      title: 'Tae4',
      siteurl: '/Tae4',
      width: '50%',
    },
    ];
    return (
        <Container>
        <h1>Taequeondo page</h1>
        <div>
        <Button variant="contained" color="secondary" onClick={ () => {history.goBack()} }> 뒤로 버튼 </Button>  
        </div>
       
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
          component={RouterLink} to={image.siteurl}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}

        </Container>
    )
}

export default Tae;



const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 300,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));
