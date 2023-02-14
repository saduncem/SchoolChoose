import {
  Wizard,
  WizardStep,
  FlexBox,
  FlexBoxDirection,
  Label,
  Input,
  InputType,
  Button,
  ButtonDesign,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  Loader,
  Page
} from '@ui5/webcomponents-react';
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { WizardStepDomRef } from '@ui5/webcomponents-react/webComponents/WizardStep';
import { loyalityApiService } from '../services/Loyality/index';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { useSelector, useDispatch } from "react-redux";
import { setUserinfo, userData,   setCampaingList } from '../../src/store/private/userSlice';

const CampaingComponent = () => {

  const step1 = useRef<WizardStepDomRef>(null);
  const step2 = useRef<WizardStepDomRef>(null);
  const step3 = useRef<WizardStepDomRef>(null);
  const step4 = useRef<WizardStepDomRef>(null);
  const [steps] = useState([step1, step2, step3,step4]);
  const [reservationNo, setReservationNo] = useState<number | any>();
  const [campaingDetail, setCampaingDetail] = useState<any>();
  const { userInfo, pointInfo, CampaingList } = useSelector(userData)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    steps.forEach((step, i) => {
    
      if (i !== 0 && step.current != null) {
        step.current.disabled = true;
      }
      const items = JSON.parse(localStorage.getItem('loginuser'));
      // setCampaingDetail(deta);
      // goToStep(4);
    });
    // if(!pointInfo) {
    //   try {
     
    //     loyalityApiService.getlLoyaltyProgramPointConversion().then(res =>
    //       dispatch(setPointConversion(res.data?.result))
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }, []);

  const getUserInfo = async () => {
      if(!reservationNo){
        return;
      }
      try {
        setLoading(true);
        const result = await loyalityApiService.getUserInfo(+reservationNo);
        if(result?.data?.result === null) {
          alert(result?.data.message);
          setLoading(false);
          return;
        }
        dispatch(setUserinfo(result?.data?.result));
        console.log("userinfo :",result?.data?.result);
        if(result?.data?.result.isHotelRunner) {
         
          alert("Hotel Runner Kaydı Crm'den Başarı ile alınmıştır. İşlem Tamamlanmıştır");
          setLoading(false);
          return;
        }
        if(result?.data?.result.isExistCampaing) {
          alert("Bu Hotel Runner rezervasyonu için   daha önce Crm'den kayı alınmıştır");
          setLoading(false);
          return;
        }
        setLoading(false);
        goToStep(2);
      } catch (error) {
        console.log(error);
      }
  }


  const SendCampign = useCallback(() => {

    const items = JSON.parse(localStorage.getItem('loginuser'));
    let benefitMap = JSON.parse(JSON.stringify(campaingDetail));
     delete benefitMap.uuid;
     delete benefitMap.id;
     delete benefitMap.campaignPayment.uuid;
     delete benefitMap.campaignPayment.id;
    const postdata = {
      CampaingName:campaingDetail?.campaign?.name,
      Campaingid :campaingDetail?.campaign?.uuid,
      Nameid:userInfo.nameId,
      Reservasyonid:userInfo.reservationNo,
      status:"YENİ",
      username:items?.username,
      campaignTransactionId:CampaingList?.campaignTransactionId,
      memberuuid:CampaingList?.loyaltyMembership.uuid,
    }
   
   setLoading(true);
    loyalityApiService.SetCampign(postdata).then(response => {
      if (response.data && response.data.statusCode == 200) {
        const result = response.data.result?.data;
        setLoading(false);
      }
      else if (response.error) {
        // TODO: Mesaj gösterilecek
        alert(response.error.message);
        setLoading(false);
      }
    });
  },[campaingDetail,userInfo]);

  const GetDetail = useCallback((param) => {
    setCampaingDetail(param);
    goToStep(4);
  },[]);

  const getCampainInfo = async (param: any) => {
    setLoading(true);
    loyalityApiService.getCampainInfo(param).then(response => {
      if (response.data && response.data.statusCode == 200) {
        dispatch(setCampaingList(response.data.result?.data));
        setLoading(false);
        goToStep(3);
      }
      else if (response.error) {
        setLoading(false);
        alert(response.error.message);
      }
    })
  }
 
  const ListRow = (props: any) => {
    return (
      <>
        {props?.param?.benefitTMaps?.map((item: any) =>
          <TableRow key={item?.id}>
            <TableCell>
              <Label>{item?.campaign?.name} </Label>
            </TableCell>
            <TableCell>
              <Label>{item?.campaign?.statusType?.statusTypeId}</Label>
            </TableCell>
            <TableCell>
              <Label>{item?.campaign?.startDateTime}</Label>
            </TableCell>
            <TableCell>
              <Label>{item?.campaign?.campaignType?.name}</Label>
            </TableCell>
            <TableCell>
        <Button   icon="employee"  onClick={() => GetDetail(item)}    >    SEÇ   </Button>
            </TableCell>
          </TableRow>
        )}
      </>
    )
  };

  const goToStep = (stepIndex: number) => {
    steps.forEach((step, index) => {
      if (step.current != null) {
        if (index !== stepIndex - 1) {
          step.current.disabled = true;
          step.current.selected = false;
        } else {
          step.current.selected = true;
          step.current.disabled = false;
        }
      }
    });
  };



  return (
    <Wizard className={'content'} style={{
      height: '500px',
    }}>
      <WizardStep id='1'  selected ref={step1} icon="product" titleText="Sadakat Programı Üyelik Kontrolü"  >
        <FlexBox className={'form-wrap'} direction={FlexBoxDirection.Column} style={{
    backgroundColor:'white'
  }}> 
          <Label className={'form-label'} style={{fontWeight:'bold'}}>Confirmation  No</Label>
          <Input onChange={(event: Ui5CustomEvent<HTMLInputElement, never>) => setReservationNo(event.target.value)} type={InputType.Text} />
          {/* <Label className={'form-label'} style={{fontWeight:'bold'}}>Folio No</Label>
          <Input type={InputType.Text} /> */}
        </FlexBox>

       
        {loading && <Loader />}
          <Button
            id="openResponsivePopoverBtn"
            className={'btn-step'}
            design={ButtonDesign.Emphasized}
            onClick={() => getUserInfo()}
          >
            Sorgula ve Devam Et
          </Button>
          
      </WizardStep>
      <WizardStep id='2' ref={step2} icon="product" titleText="Üye Bilgisi">

        <FlexBox className={'table'} style={{
    backgroundColor:'white'
  }}>
          <Table
            columns={
              <>
                <TableColumn>
                  <Label>Adı Soyadı</Label>
                </TableColumn>
                <TableColumn>
                  <Label>Telefon</Label>
                </TableColumn>
                <TableColumn>
                  <Label>Cinsiyet</Label>
                </TableColumn>
                <TableColumn>
                  <Label>Uyruk</Label>
                </TableColumn>
                <TableColumn>
                  <Label>Üyelik Tipi</Label>
                </TableColumn>
              </>
            }
          >
            <TableRow>
              <TableCell>
                <Label>{userInfo?.name}  {userInfo?.lastName} </Label>
              </TableCell>
              <TableCell>
                <Label>{userInfo?.membershipDetail?.contactByPhone?.communicationValue}</Label>
              </TableCell>
              <TableCell>
                <Label>{userInfo?.cinsiyet}</Label>
              </TableCell>
              <TableCell>
                <Label>{userInfo?.uyruk}</Label>
              </TableCell>
              <TableCell>
                <Label>{userInfo?.uyelikTipi}</Label>
              </TableCell>
            </TableRow>
          </Table>
        </FlexBox>
        <Button
          className={'btn-back-step'}
          design={ButtonDesign.Emphasized}
          onClick={() => goToStep(1)}
        >
          Geri
        </Button>
        {loading && <Loader />}
        <Button
          className={'btn-step'}
          design={ButtonDesign.Emphasized}
          onClick={() => getCampainInfo(userInfo?.membershipDetail?.uuid)}>
          Sorgula ve Devam Et
        </Button>
      </WizardStep>
      <WizardStep id='3' ref={step3} icon="product" titleText="Kampanya Listesi">
        <FlexBox className={'table'}>
          <Table
            columns={
              <>
                <TableColumn>
                  <Label>Kampanya Adı</Label>
                </TableColumn>
                <TableColumn>
                  <Label>Durumu</Label>
                </TableColumn>
                <TableColumn>
                  <Label>Başlangıç Tarihi</Label>
                </TableColumn>
                <TableColumn>
                  <Label>Kampanya Tipi</Label>
                </TableColumn>
                <TableColumn>
                  <Label>Kampanta Detayı</Label>
                </TableColumn>
              </>
            }
          >

            {CampaingList &&  <ListRow param={CampaingList} /> }
          </Table>

        </FlexBox>
        <Button
          className={'btn-back-step'}
          design={ButtonDesign.Emphasized}
          onClick={() => goToStep(2)}
        >
          Geri
        </Button>
      </WizardStep>
      <WizardStep id='4'  ref={step4} icon="product" titleText="Kampanya Detayı"  >

        <Page backgroundDesign="Solid"  
  
  style={{
    height: '350px',
    backgroundColor:'white'
  }}
    >
        <div>
   <p>
     Kapmanya Adı :   <strong> {campaingDetail?.campaign?.name}</strong>
   </p>
   <p>
    Durumu :   <strong> {campaingDetail?.campaign?.statusType?.statusTypeId}</strong>
   </p>
   <p>
     Başlangıç Tarihi :   <strong> {campaingDetail?.campaign?.startDateTime}</strong>
   </p>
   <p>
     Bitiş  Tarihi :   <strong> {campaingDetail?.campaign?.endDateTime}</strong>
   </p>
   <p>
    Kampanya Tipi :   <strong> {campaingDetail?.campaign?.campaignType?.name}</strong>
   </p>
  </div>

  <Button
         
          design={ButtonDesign.Attention}
          onClick={ SendCampign }
        >
        Kampanya kullan
        </Button>
        </Page>
        {loading && <Loader />}
        <Button
          className={'btn-back-step'}
          design={ButtonDesign.Emphasized}
          onClick={() => goToStep(3)}
        >
          Geri
        </Button>
      </WizardStep>
    </Wizard>
  )
};

export default CampaingComponent;
