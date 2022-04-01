import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import winefiAPI from '../utils/winefiAPI';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Wine-Fi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [submitted, setSubmitted] = useState(false);
  const routerHistory = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    //console.log(data.entries());
    const data = {
      userId : event.target.userId.value,
      userPassword : event.target.userPassword.value,
      retpName : event.target.retpName.value,
      retlName : event.target.retlName.value,
      retlPhone : event.target.retlPhone.value,
      retlAddress : event.target.retlAddress.value,
      retlRegNo : event.target.retlRegNo.value,
      retlEmail : event.target.retlEmail.value,
      promoCode : event.target.promoCode.value
    };
    console.log(data);
    setSubmitted(true);
    var [res, msg] = await winefiAPI.signup(data);
    console.log(res);
    if(res) {
      toast.info("회원가입 성공! 운영자 승인 후 로그인 가능합니다." , {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      routerHistory.push('/login');
    } else {
      toast.info(msg , {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setSubmitted(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userId"
                  label="계정명"
                  name="userId"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userPassword"
                  label="비밀번호"
                  type="userPassword"
                  id="userPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="retpName"
                  label="이름"
                  name="retpName"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="retlName"
                  label="가맹점명"
                  name="retlName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="retlPhone"
                  label="가맹점 전화번호"
                  name="retlPhone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="retlAddress"
                  label="가맹점 주소"
                  name="retlAddress"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="retlRegNo"
                  label="사업자 번호"
                  name="retlRegNo"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="retlEmail"
                  label="이메일 주소"
                  name="retlEmail"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="promoCode"
                  label="추천인 코드"
                  name="promoCode"
                />
              </Grid>
            </Grid>
            {
              submitted ? 
              <Box 
              mt={2} 
              sx={{ 
                display: 'flex',
                justifyContent: 'center'
              }}>
              <CircularProgress />
              </Box>
              :
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              >
              회원가입 신청
              </Button>
            }
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  이미 계정이 있으신가요?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}