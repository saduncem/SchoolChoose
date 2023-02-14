import {
  Wizard,
  WizardStep,
  Title,
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
  MessageBox,
  MessageBoxActions
} from '@ui5/webcomponents-react';
import React ,{useRef,useState,useEffect,useMemo, useCallback } from 'react';
import { WizardStepDomRef } from '@ui5/webcomponents-react/webComponents/WizardStep';
import { loyalityApiService } from '../services/Loyality/index';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { useSelector, useDispatch } from "react-redux";
import { setUserinfo, userData,setCampaingList } from '../../src/store/private/userSlice';
import generateSmsCode from '../../src/Helper/Function';
import { setpointData,loyalityPointData,setMemberholdPoint } from '../../src/store/private/loyalityPointSlice';
const LoyalityPointCompponent = () => {

  const step1 = useRef<WizardStepDomRef>(null);
  const step2 = useRef<WizardStepDomRef>(null);
  const step3 = useRef<WizardStepDomRef>(null);
  const step4 = useRef<WizardStepDomRef>(null);
  const [steps] = useState([step1, step2, step3, step4]);
  const [reservationNo, setReservationNo] = useState<number | any>();
  const [folioNumber, setFolionumber] = useState<number | any>();
  const [holdPoint, setHoldPoint] = useState<any>();
  const dispatch = useDispatch();
  const { userInfo, pointInfo, CampaingList } = useSelector(userData)
  const { pointData,memberholdPoint } = useSelector(loyalityPointData);
  const [loading, setLoading] = useState(false);
  const [isHold, setIsHold] = useState(true);
  const [open, setOpen] = useState(false);
  const [isReadOnly, setisReadOnly] = useState(false);
  const [smsCode, setSmsCode] = useState<number | any>();


  useEffect(() => {
    steps.forEach((step, i) => {
      if (i !== 0 && step.current != null) {
        step.current.disabled = true;
      }
    });
    console.log(pointInfo);
  }, [pointInfo]);

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


  const getUserInfo = async () => {

    if(!reservationNo){
      alert("Rezervasyon No giriniz.");
      return;
    }
    if(!folioNumber){
      alert("Folio  No giriniz.");
      return;
    }

    loyalityApiService.getUserInfo(+reservationNo).then(response => {
      if (response.data && response.data.statusCode == 200) {
        const result = response.data.result;
        dispatch(setUserinfo(result));
        goToStep(2);
      }
      else if (response.error) (
        // TODO: Mesaj gösterilecek
        alert(response.error.message)
      )
    })
  };
  const SmsCodeSetHandler = (event:any) => {
    setSmsCode(event.target.value);
  }

  const HoldPointtHandler = (event:any) => {
    setHoldPoint(event.target.value);
  }
  const OpenSmsModal = () => {
    if (!holdPoint) {
      alert("Geçerli bir değer giriniz.");
      return
    }

    if(holdPoint > pointData?.activeBalance) {
      alert("Yetersiz Bakiye.");
      return;
    }

    try {
      var postdata = {
        number:"+905363416041",
        code:generateSmsCode()
      }
     const smscode = {smscode :postdata.code}
     localStorage.setItem('Code', JSON.stringify(smscode));
     loyalityApiService.sendSmsValidation(postdata).then(response=> {
        const result = response.data?.data;
         if(result.responseCode == "00") {
          setOpen(true);
         }
       });
   } catch (error) {
      alert(error);
     }

    //  const items= JSON.parse(localStorage.getItem('Code'));
    //  console.log(items);
  };
  
  const MessageBoxComponent = () => {
  
    const handleClose = (event:any) => {
      if (event.detail.action === MessageBoxActions.OK) {
        if (!smsCode) {
          alert("Geçerli bir değer giriniz.");
          return;
        }
        const items= JSON.parse(localStorage.getItem('Code') as string);
        if(items.smscode ===  smsCode ){
          
          setSmsCode('');
          setOpen(false);
          setHoldPointHandler();
        }
        else {
          alert("Hatalı kod");
          setSmsCode('');
        }
      } else {
        setOpen(false);
      }
    };
    return (
      <>
        <MessageBox
          open={open}
          onClose={handleClose}
          actions={[MessageBoxActions.OK, MessageBoxActions.Cancel]}
        >
         <FlexBox
                        className={'form-wrap'}
                        direction={FlexBoxDirection.Column}
                      >
         <Label className={'form-label'}>Sms Kodu</Label>
         <Input type={InputType.Number}  onChange={SmsCodeSetHandler} value={smsCode} />
         </FlexBox>
        </MessageBox>
      </>
    );
  };

  const setHoldPointHandler = useCallback(() => {

     setLoading(true);
    loyalityApiService.getCampainInfo(userInfo?.membershipDetail?.uuid).then(response => {
      if (response.data && response.data.statusCode == 200) {
        const result = response.data.result?.data;
        dispatch(setCampaingList(result));
        console.log(result);
        var postdata = {
          uuid : pointData?.uuid,
          balance:holdPoint,
          campaignTransactionId : result?.campaignTransactionId
        }
        SendHoldHandler(postdata);
      }
      else if (response.error) {
        setLoading(false);
        // TODO: Mesaj gösterilecek
        alert(response.error.message);
        
      }
    });

  },[userInfo,holdPoint]);
   

  const setHoldCancel = useCallback(()=> {
    
    setLoading(true);
     if(holdPoint) {
      var postdata = {
        uuid : memberholdPoint?.uuid,
        balance:holdPoint,
        accountuiid:memberholdPoint?.account?.uuid,
        campaignTransactionId : CampaingList?.campaignTransactionId
      };

      loyalityApiService.SendlLoyaltyCancelHoldForCustomer(postdata).then(response => {
        if (response.data && response.data.statusCode == 200) {
          const result = response.data.result?.data;
          setIsHold(previus => !previus);
          getCustomerPoint(userInfo?.membershipDetail?.uuid);

        }
        else if (response.error) {
          alert(response.error.message);
        }
        setLoading(false);
      });
    }
     else {
      alert("Geçerli bir değer giriniz");
     }

  },[holdPoint,memberholdPoint]);

  const SendHoldHandler = (postdata:any) => {
    loyalityApiService.SendlLoyaltyHoldForCustomer(postdata).then(response => {
          if (response.data && response.data?.data?.statusCode == 200) {
            const result = response.data?.data?.data;
            dispatch(setMemberholdPoint(result));
            getCustomerPoint(userInfo?.membershipDetail?.uuid);
            setLoading(false);
            setIsHold(previus => !previus);
            setisReadOnly(true);
          }
          else {
            alert("Hata Oluştu");
          }
        })
    };

  const setHoldLOSSPointHandler = () => {

    if (!holdPoint) {
      alert("Geçerli bir değer giriniz.");
      return
    }
    if(holdPoint > pointData?.activeBalance) {
      alert("Yetersiz Bakiye.");
      return;
    }
    var postdata = {
      uuid : memberholdPoint?.uuid,
      balance:holdPoint,
      accountuiid:memberholdPoint?.account?.uuid,
      campaignTransactionId : CampaingList?.campaignTransactionId
    }
   
    loyalityApiService.SendlLoyaltyLOSTHoldForCustomer(postdata).then(response => {
      if (response.data && response.data?.data?.statusCode == 200) {
        const result = response.data?.data?.data;
        console.log(result);
         getCustomerPoint(userInfo?.membershipDetail?.uuid);
         setIsHold(prev=> !prev);
         setHoldPoint('');

      }
      else {
        setIsHold(previus => !previus);
        alert("Hata Oluştu");
      }
    })
  };

  const getCustomerPoint=  (uuid :any) => {
    loyalityApiService.getCustomerPoint(uuid).then(response => {
      if (response.data && response.data.statusCode == 200) {
        const result = response.data.result;
        dispatch(setpointData(result));
        goToStep(3);
      }
    })
  }

  const Item =(props:any) =>{
    return <TableCell> <Label> {props.item}</Label></TableCell>;
  }


return(
  <Wizard className={'content'}  style={{
    height: '400px'
  }}>
                    <WizardStep id='1' selected ref={step1}>
                      <Title className={'sub-title'}>
                        Rezervasyon Sorgula
                      </Title>

                      <FlexBox
                        className={'form-wrap'}
                        direction={FlexBoxDirection.Column}
                      >
                        <Label className={'form-label'}>Rezervasyon No</Label>
                        <Input onChange={(event: Ui5CustomEvent<HTMLInputElement, never>) => setReservationNo(event.target.value)} type={InputType.Text}  />
                        <Label className={'form-label'}>Folio No</Label>
                        <Input type={InputType.Text}  onChange={(event: Ui5CustomEvent<HTMLInputElement, never>) => setFolionumber(event.target.value)} />
                      </FlexBox>
                      <Button
                        className={'btn-step'}
                        design={ButtonDesign.Emphasized}
                        onClick={() => getUserInfo()}
                      >
                        Sorgula ve Devam Et
                      </Button>
                    </WizardStep>
                    <WizardStep id='2' ref={step2}>
                      <Title className={'sub-title'}>
                        Müşteri Bilgileri -{userInfo?.name} {userInfo?.lastName} 
                      </Title>

                      <FlexBox className={'table'}>
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
                              <Label>{userInfo?.name} {userInfo?.lastName} </Label>
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
                      <Button
                        className={'btn-step'}
                        design={ButtonDesign.Emphasized}
                        onClick={()=> getCustomerPoint(userInfo?.membershipDetail?.uuid)}>
                         Sorgula ve Devam Et
                      </Button>
                    </WizardStep>
                    <WizardStep id='3' ref={step3}>
                      <Title className={'sub-title'}>Puan Bilgileri </Title>
                      <FlexBox className={'table'}>
                        <Table
                          columns={
                            <>
                              <TableColumn>
                                <Label>Müşteri</Label>
                              </TableColumn>
                              <TableColumn>
                                <Label>
                                  Telefon
                                </Label>
                              </TableColumn>
                            </>
                          }
                        >
                          <TableRow>
                            <TableCell>
                              <Label>{userInfo?.name} {userInfo?.lastName}</Label>
                            </TableCell>
                            <TableCell>
                <Label>{userInfo?.membershipDetail?.contactByPhone?.communicationValue}</Label>
              </TableCell>
                          </TableRow>
                        </Table>

                        <Table
                          columns={
                            <>
                              <TableColumn> <Label>Aktif Puan</Label> </TableColumn>
                              <TableColumn><Label>Hold Edilmiş Puan</Label></TableColumn>
                              <TableColumn><Label>Toplam Puan</Label></TableColumn>
                              <TableColumn><Label>TL  Puan</Label></TableColumn>
                              <TableColumn><Label></Label></TableColumn>
                              <TableColumn><Label>Hold Et</Label></TableColumn>
                              {!isHold && <TableColumn><Label>Hold İptal</Label></TableColumn>}
                              {!isHold && <TableColumn><Label>Puan Kullan</Label></TableColumn>}
                            </>
                          }
                        >
                          <TableRow>
                            <TableCell>
                              <Label>{pointData?.activeBalance} </Label>
                            </TableCell>
                            <TableCell>
                              <Label>{pointData?.holdBalance}</Label>
                            </TableCell>
                            <TableCell>
                              <Label>{pointData?.totalBalance}</Label>
                            </TableCell>
                            <TableCell>
                              <Label>{ pointInfo && (pointData?.activeBalance / pointInfo?.targetAmount)  }  TL  </Label>
                            </TableCell>
                            <TableCell>
                            <Input readonly={isReadOnly} onChange={(event: Ui5CustomEvent<HTMLInputElement, never>) => HoldPointtHandler(event)} type={InputType.Number} value={holdPoint}  />
                        </TableCell>
                            <TableCell>
                          <Button disabled={!isHold}  onClick={OpenSmsModal}>{loading ? "Lütfen Bekleyiniz" : "Hold Et" }</Button>
                        </TableCell>
                        <TableCell>
                          {!isHold && <Button  onClick={setHoldCancel}>Hold İptal</Button>}
                        </TableCell>
                        <TableCell>
                        {!isHold && <Button disabled={isHold} onClick={setHoldLOSSPointHandler}>Tl Puan Kullan</Button>}
                        </TableCell>
                          </TableRow>
                        </Table>
                      </FlexBox>
                      {loading && <Loader />}
                      <Button
                        className={'btn-back-step'}
                        design={ButtonDesign.Emphasized}
                        onClick={() => goToStep(2)}
                      >
                        Önceki
                      </Button>
                      <MessageBoxComponent  />
                    </WizardStep>
                    <WizardStep id='4' ref={step4}>
                      <Title className={'sub-title'}>Kampanya Puan Sorgulama</Title>
                    </WizardStep>
  </Wizard>
)};

export default LoyalityPointCompponent;
