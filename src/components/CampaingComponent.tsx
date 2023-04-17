import {
  Wizard,
  WizardStep,
  FlexBox,
  FlexBoxDirection,
  Label,
  Button,
  ButtonDesign,
  Table,
  TableColumn,
  Loader,
  Page,
  Select ,
  Option
} from '@ui5/webcomponents-react';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { WizardStepDomRef } from '@ui5/webcomponents-react/webComponents/WizardStep';
import { apiService } from '../services/Loyality/index';
import { Ui5CustomEvent } from '@ui5/webcomponents-react/interfaces/Ui5CustomEvent';
import { useSelector, useDispatch } from "react-redux";
import { setCityList ,userData } from '../../src/store/private/userSlice';
import axios from 'axios';
const CampaingComponent = () => {

  const data = [{"id":0,"cityCode":"50","cityName":"Şehirler","countryId":217,"createdBy":1,"createdDate":"2023-02-12","modifiedBy":1,"modifiedDate":"2023-02-12"},{"id":5,"cityCode":"05","cityName":"AMASYA","countryId":217,"createdBy":1,"createdDate":"2023-02-12","modifiedBy":1,"modifiedDate":"2023-02-12"}];
  const step1 = useRef<WizardStepDomRef>(null);
  const step2 = useRef<WizardStepDomRef>(null);
  const step3 = useRef<WizardStepDomRef>(null);
  const step4 = useRef<WizardStepDomRef>(null);
  const [steps] = useState([step1, step2, step3,step4]);
  const { cityList } = useSelector(userData)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    steps.forEach((step, i) => {
      if (i !== 0 && step.current != null) {
        step.current.disabled = true;
      }
    });
  getCityList(data);
  }, []);

  const getCityList = async (param) => {
      try {

        setLoading(true);
        // const result = await apiService.getCityList();
        // if(result?.data?.result === null) {
        //   alert(result?.data.message);
        //   setLoading(false);
        //   return;
        // }
        dispatch(setCityList(param));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
  }


  const GetDistricts = useCallback(() => {

   setLoading(true);
    apiService.getCity(1).then(response => {
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
  },[cityList]);

  const GetDetail = useCallback((param) => {
    goToStep(4);
  },[]);

  const getCampainInfo = async (param: any) => {
    setLoading(true);
    apiService.getDistricts(param).then(response => {
      if (response.data && response.data.statusCode == 200) {
        // dispatch(setCampaingList(response.data.result?.data));
        setLoading(false);
        goToStep(3);
      }
      else if (response.error) {
        setLoading(false);
        alert(response.error.message);
      }
    })
  }
  

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

  const onChangeCity = (param:any)=> {
    console.log(param);
    goToStep(2)
  }
  

  const onChangeDiscty = (param:any)=> {
    console.log(param)
  }
  return (
    <Wizard className={'content'} style={{
      height: '500px',
    }}>
      <WizardStep id='1'  selected ref={step1} icon="product" titleText="Şehir Seç"  >
        <FlexBox className={'form-wrap'} direction={FlexBoxDirection.Column} style={{
    backgroundColor:'white'
  }}> 
          <Label className={'form-label'} style={{fontWeight:'bold'}}>Şehir Listesi</Label>
          { <Select 
          onChange={onChangeCity}
        >
         {data.map((item) => (
          <Option key={item.id} data-id={item.id}>
            {item.cityName}
          </Option>
  ))}
        </Select> }
          
        </FlexBox>
          
      </WizardStep>
      <WizardStep id='2' ref={step2} icon="product" titleText="İlçe Listesi">

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
          onClick={() => getCampainInfo("")}>
          Sorgula ve Devam Et
        </Button>
      </WizardStep>
      <WizardStep id='3' ref={step3} icon="product" titleText="Okul Listesi">
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

            {/* {CampaingList &&  <ListRow param={CampaingList} /> } */}
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
      <WizardStep id='4'  ref={step4} icon="product" titleText="Okul Detayı"  >

        <Page backgroundDesign="Solid"  
  
  style={{
    height: '350px',
    backgroundColor:'white'
  }}
    >
        <div>
   <p>
     Kapmanya Adı :   
   </p>
   <p>
    Durumu :   
   </p>
   <p>
     Başlangıç Tarihi :   
   </p>
   <p>
     Bitiş  Tarihi :  
   </p>
   <p>
    Kampanya Tipi :   
   </p>
  </div>

  <Button
          design={ButtonDesign.Attention}
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
