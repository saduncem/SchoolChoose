import {
  Avatar,
  Text,
  FlexBox,
  FlexBoxDirection,
  Title
} from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/customer.js';
import '@ui5/webcomponents-icons/dist/account';
import CampaingComponent from '../../components/CampaingComponent';

const WizardPage = () => {

 
  return (
    <div className='wizard-page'>
      {
        <>

          <FlexBox direction={FlexBoxDirection.Column}>

            <FlexBox className={'header'}>
              <FlexBox className={'logo'}>
                <img
                  src={"/src/public/images/logo.png"}
                  alt=' Logo'
                />
              </FlexBox>
             
            </FlexBox>
            <FlexBox
              className={'wizard-wrap'}
              direction={FlexBoxDirection.Column}
            >
              
              <Title className='header'> Eğitim  Kardeş</Title>
                  <FlexBox    direction={FlexBoxDirection.Column} justifyContent="SpaceAround" alignItems='Start' >
                
                      <CampaingComponent />
                    
                     </FlexBox>
               

            </FlexBox>
          </FlexBox>
        </>
      }
    </div>
  );
};

export default WizardPage;
