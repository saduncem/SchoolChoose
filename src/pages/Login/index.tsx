import "@ui5/webcomponents/dist/Icon";
import {
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  Title,
  Text,
  Card,
  Label,
  Input,
  InputType,
  Button,
  ButtonDesign,
  MessageStrip ,
  Icon
} from '@ui5/webcomponents-react';

import React, { useState ,useCallback, useEffect} from 'react';
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate
} from "react-router-dom";
import { loyalityApiService } from '../../services/Loyality';
const Login = () => {

  const navigate = useNavigate();
  const [username, setUserName] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<any>();
  const [token, setToken] = useState<any>();

  useEffect(()=>{
         console.log('geldi')
  },[]);
 
 
  // const getUserInfo = async () => {
  //   loyalityApiService.getDomainUser().then(response => {
  //     if (response.data && response.data.statusCode == 200) {
  //       const result = response.data.result;
  //       setToken(result);
  //       console.log(response);
  //     }
  //     else if (response.error) (
  //       alert(response.error.message)
  //     )
  //   })
  // };

  const handleSubmit =  useCallback((e:any) => {
    e.preventDefault();
    const isLogin = {username :token}
    localStorage.setItem('loginuser', JSON.stringify(isLogin));
    navigate('/main');
  },[token]);


  // TODO: Logo yu locale almalı
  return (
    <FlexBox className={'login-page'} direction={FlexBoxDirection.Column}>
      <FlexBox className={"logo"}>
        <img
          src='https://www.dijiplus.com/wp-content/uploads/2019/06/divan-logo.png'
          alt='Divan Logo'
        />
      </FlexBox>
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
        className={"content-wrap"}
      >
        <>
          <FlexBox
            className={'first-column'}
            direction={FlexBoxDirection.Column}
          >
            <Title className={'title'}>
              Kusursuz hizmet tutkusuyla çalışan büyük bir aileyiz!
            </Title>
            <Text className={'description'}>
              Görkemli hayalleri takım ruhuyla gerçeğe dönüştürürüz. Aşılmaz
              görünen engelleri birlikten ve dayanışmadan doğan güçle aşarız.
            </Text>
          </FlexBox>
          <FlexBox
            className={'secondary-column'}
            direction={FlexBoxDirection.Column}
          >
            
            <Card className={'card'}>
            {errorMessage &&
             <MessageStrip  hideCloseButton={true} icon={<Icon name="employee" color="red" />} >
               {errorMessage}
              </MessageStrip>
              }
            <form onSubmit={handleSubmit}>
              <FlexBox className={'form-group'}>
                <Label className={'form-label'}>Oturum Adı</Label>
                <Input type={InputType.Text} value={token}  readonly={true}/>
              </FlexBox>
              <FlexBox justifyContent={FlexBoxJustifyContent.End}>
                <Button
                  className={'btn-submit'}
                  design={ButtonDesign.Emphasized}
                  onClick={handleSubmit}
                >
                  Giriş
                </Button>
              
              </FlexBox>
             
              </form>
            </Card>
          </FlexBox>
        </>
      </FlexBox>
    </FlexBox>
  );
};

export default Login;
