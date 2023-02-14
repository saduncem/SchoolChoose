import { useRef, useState, useEffect } from 'react';
import {
  Avatar,
  Text,
  FlexBox,
  FlexBoxDirection,
  TabContainer,
  Tab
} from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/account';
import { loyalityApiService } from '../../services/Loyality';
import CampaingComponent from '../../components/CampaingComponent';
import LoyalityPointCompponent from '../../components/LoyalityPointCompponent';
import { IUserInfo } from '../../models/UserInfo/index';
import CampaingOutComponent from   '../../components/CampaingOutComponent';
import {  useNavigate} from "react-router-dom";
import { setPointConversion } from '../../store/private/userSlice';
import {  useDispatch } from "react-redux";
import { Logo}   from "../../components/logo";

const WizardPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [reservationNo, setReservationNo] = useState<number | any>();
  const [userInfo, setuserInfo] = useState<IUserInfo>();
  const [username, setUsername] = useState<string>();
  
 
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('loginuser') as string);
    if(items == null || !items?.username){
      navigate('/');
      return;
    }
    setUsername(items);
  }, [reservationNo]);


  const getUser=  async () => {
   
  }
 
  return (
    <div className='wizard-page'>
      {
        <>

          <FlexBox direction={FlexBoxDirection.Column}>

            <FlexBox className={'header'}>
              <FlexBox className={'logo'}>
                <img
                  src={Logo}
                  alt=' Logo'
                />
              </FlexBox>
              <FlexBox className={'user-info'}>
                <Text>{username}</Text>
              </FlexBox>
              <FlexBox className={'avatar'}>
                <Avatar icon={'customer'} />
              </FlexBox>
            </FlexBox>
            <FlexBox
              className={'wizard-wrap'}
              direction={FlexBoxDirection.Column}
            >

              <TabContainer onTabSelect={function noRefCheck() { }}>
                <Tab
                   selected
                  additionalText=""
                  icon="menu"
                  
                  text="Kampanya Giriş Sorgulama "
                >
                  <FlexBox    direction={FlexBoxDirection.Column} justifyContent="SpaceAround" alignItems='Start' >
                
                      <CampaingComponent />
                    
                     </FlexBox>
                </Tab>
                <Tab   additionalText=""  icon="activities" text="Kampanya Çıkış Sorgulama" >
                <FlexBox    direction={FlexBoxDirection.Column} justifyContent="SpaceAround" alignItems='Start' >
                
                <CampaingOutComponent />
              
               </FlexBox>
                </Tab>
                <Tab   additionalText=""  icon="activities" text="Kampanya Puan Sorgulama" >
                 
                  <LoyalityPointCompponent />
                 
                 </Tab>
               
              </TabContainer>

            </FlexBox>
          </FlexBox>
        </>
      }
    </div>
  );
};

export default WizardPage;
