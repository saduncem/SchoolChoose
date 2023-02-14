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
import { setUserinfo, userData,  setSelectCampaing, setCampaingList } from '../../src/store/private/userSlice';

const CampaingOutComponent = () => {

  const step1 = useRef<WizardStepDomRef>(null);
  const step2 = useRef<WizardStepDomRef>(null);
  const step3 = useRef<WizardStepDomRef>(null);
  
  const [steps] = useState([step1, step2, step3]);
  const [reservationNo, setReservationNo] = useState<number | any>();
  const [folioNumber, setfolioNumber] = useState<number | any>();
  const [campaingDetail, setCampaingDetail] = useState<any>();
  const { userInfo, pointInfo, CampaingList ,selectCampaing} = useSelector(userData)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isActiveButton, setisActiveButton] = useState(true);
 
  useEffect(() => {
    steps.forEach((step, i) => {
    
      if (i !== 0 && step.current != null) {
        step.current.disabled = true;
      }
    });
   
  }, []);

  const getUserInfo =  useCallback( () => {
    if(!reservationNo){
      console.log('boş')
      return;
    }

    try {
       setLoading(true);
       loyalityApiService.getUserInfo(+reservationNo).then(result=> {
        dispatch(setUserinfo(result?.data?.result));
        setisActiveButton(false);
        setLoading(false);
        if(CampaingList == null) {
          GetCampingList(result?.data?.result?.membershipDetail.uuid);
        }
        goToStep(2);

      });
     
    } catch (error) {
      console.log(error);
    }
 },[CampaingList,reservationNo]);

  const SendCampign = useCallback((param:any) => {
    const items = JSON.parse(localStorage.getItem('loginuser'));
  
    var finditem =  CampaingList?.benefitTMaps.find(s=>s.campaign.id == campaingDetail?.id);
    let benefitMap = JSON.parse(JSON.stringify(finditem));
     delete benefitMap.uuid;
     delete benefitMap.id;
     delete benefitMap.campaignPayment.uuid;
     delete benefitMap.campaignPayment.id;
    const postdata = {
      Reservasyonid:userInfo.reservationNo,
      status:param,
      username:items?.username,
      benefitData :JSON.stringify(benefitMap)
    }
    setLoading(true);
    loyalityApiService.setUpdateCampign(postdata).then(response => {
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
  },[campaingDetail,userInfo,CampaingList]);

  const GetDetail = useCallback(() => {
    goToStep(3);
  },[]);

  const getCampainInfo = useCallback(async (param: any) => {
     setLoading(true);
    var postdata = {
      rezervasyonid:parseInt(userInfo?.reservationNo),
      nameid:userInfo?.nameId
    }

    loyalityApiService.getSelectCamping(postdata).then(response => {
      if (response.data && response.data.statusCode == 200) {
        const result = response.data.result;
        const data = JSON.parse(result);
      
         setCampaingDetail(data?.data);
         goToStep(3);
         setLoading(false);
      }
      else if (response.error) {
        setLoading(false);
        // TODO: Mesaj gösterilecek
        alert(response.error.message);
      }
    });

  },[userInfo,reservationNo,CampaingList]);
 

  const GetCampingList = useCallback(async  (param: any)=> {
    loyalityApiService.getCampainInfo(param).then(response => {
      if (response.data && response.data.statusCode == 200) {
         dispatch(setCampaingList(response.data.result?.data));
      }
      else if (response.error) {
      }
    });
  },[]);


  const setfolioNumberHandler = (param:any) => {
    setfolioNumber(param);
  }

  const ListRow = useCallback((props: any) => {
    return (
      <>
        {props?.param?.benefitTMaps?.map((item: any) =>
          <TableRow>
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
  },[CampaingList]);

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
      <WizardStep id='1' selected  ref={step1} icon="product" titleText="Sadakat Programı Üyelik Kontrolü"  >
        <FlexBox className={'form-wrap'} direction={FlexBoxDirection.Column} style={{
    backgroundColor:'white'
  }}> 
          <Label className={'form-label'} style={{fontWeight:'bold'}}>Rezervasyon No</Label>
          <Input onChange={(event: Ui5CustomEvent<HTMLInputElement, never>) => setReservationNo(event.target.value)} type={InputType.Text} />
          <Label className={'form-label'} style={{fontWeight:'bold'}}>Folio Numarası</Label>
          <Input onChange={(event: Ui5CustomEvent<HTMLInputElement, never>) => setfolioNumberHandler(event.target.value)} type={InputType.Text} />
        </FlexBox>

       
        {loading && <Loader />}
          <Button
            
            id="openResponsivePopoverBtn"
            className={'btn-step'}
            design={ButtonDesign.Emphasized}
            onClick={getUserInfo}
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
          onClick={() => goToStep(2)}
        >
          Geri
        </Button>
        {loading && <Loader />}
        <Button
           disabled={isActiveButton}
          className={'btn-step'}
          design={ButtonDesign.Emphasized}
          onClick={() => getCampainInfo(userInfo?.membershipDetail?.uuid)}>
          Sorgula ve Devam Et
        </Button>
      </WizardStep>
      <WizardStep id='3'  ref={step3} icon="product" titleText="Kampanya Detayı"  >

        <Page backgroundDesign="Solid"  
  
  style={{
    height: '350px',
    backgroundColor:'white'
  }}
    >
        <div>
          <p> Kampanya Guid  : </p> <strong> {campaingDetail?.uuid}</strong>
        <p>
        Kampanya No  :   <strong> {campaingDetail?.id}</strong>
   </p>
   <p>
   Kampanya Adı :   <strong> {campaingDetail?.name}</strong>
   </p>
   <p>
    Durumu :   <strong> {campaingDetail?.statusType?.statusTypeId}</strong>
   </p>
   <p>
     Başlangıç Tarihi :   <strong> {campaingDetail?.startDateTime}</strong>
   </p>
   <p>
     Bitiş  Tarihi :   <strong> {campaingDetail?.endDateTime}</strong>
   </p>
   <p>
    Kampanya Tipi :   <strong> {campaingDetail?.campaignType?.name}</strong>
   </p>
  </div>

      <Button  design={ButtonDesign.Attention}  onClick={ ()=>  SendCampign('KULLANDI') } > Kullandı </Button>
      <Button  design={ButtonDesign.Attention}  onClick={  ()=> SendCampign('KULLANMADI') } > Kullanmadı </Button>
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

export default CampaingOutComponent;
