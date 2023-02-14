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
import { IOperaUserInfo,IloyaltyMembershipPointModel,IloyaltyProgramPointConversionModel} from '../../models/OperaUserInfo/index';
import CampaingOutComponent from   '../../components/CampaingOutComponent';
import {  useNavigate} from "react-router-dom";
import { setPointConversion } from '../../store/private/userSlice';
import {  useDispatch } from "react-redux";

const WizardPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [reservationNo, setReservationNo] = useState<number | any>();
  const [userInfo, setuserInfo] = useState<IOperaUserInfo>();
  const [username, setUsername] = useState<string>();
  
 
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('loginuser'));
    if(items == null || !items?.username){
      navigate('/');
      return;
    }
    setUsername(items);
    setTimeout(async() => {
      await getlLoyaltyProgramPointConversion();
    }, 250);

  }, [reservationNo]);


  const getlLoyaltyProgramPointConversion=  async () => {
    loyalityApiService.getlLoyaltyProgramPointConversion().then(response => {
      if (response.data && response.data.statusCode == 200) {
        const result = response.data?.result;
        // setPointConversion(result[0]);
        dispatch(setPointConversion(result[0]));
      }
    })
  }
 
  const logo = (
    <img
      src='https://www.dijiplus.com/wp-content/uploads/2019/06/divan-logo.png'
      alt='Divan Logo'
    />
  );

  return (
    <div className='wizard-page'>
      {
        <>

          <FlexBox direction={FlexBoxDirection.Column}>

            <FlexBox className={'header'}>
              <FlexBox className={'logo'}>
                <img
                  src='https://www.dijiplus.com/wp-content/uploads/2019/06/divan-logo.png'
                  alt='Divan Logo'
                />
              </FlexBox>
              <FlexBox className={'user-info'}>
                <Text>{username?.username}</Text>
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
