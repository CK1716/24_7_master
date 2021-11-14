import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <Paper className={classes.paper}><Feed/></Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function Feed(){
    return (
    
    <div className="modal">
          <h2>고객센터</h2>
          <h6>kims2521@naver.com</h6>

          <h6>문의사항은 관리자에게 고객센터 혹은 이메일 주소로 연락주시면 됩니다.</h6>
 
          <h2>24/7 INFO</h2>
          <h6>(주)24/7 대표 김지욱</h6>
          <h6>본점: 사업자등록번호 1234-123</h6>
          <h6>안성시 금산동 1234-123</h6>  
    </div>
    )
}

export default Footer;