import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from 'react-data-table-component';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { Button, Card } from 'react-bootstrap';
import ReactModal from 'react-modal';
import MapBike from './MapBike';
import "./SearchInfo.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocation, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import Loading from './Loading';

export default function SearchInfo() {

  const [isLoading, setIsLoading] = useState(true);
  const [stations, setStations] = useState([]);
  const [stationsOrg, setStationsOrg] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [hiddenColumn, setHiddenColumn] = useState(true);

  const columns = [
    {
      name: 'Istasyon Adı',
      selector: row => row.IstasyonAdi,
    },
    {
      name: 'Kapasite',
      omit: hiddenColumn,
      selector: row => row.Kapasite,
    },
    {
      name: 'Doluluk Oranı',
      omit: hiddenColumn,
      selector: row => "%" + parseInt(row.DolulukOrani),
    },

    {
      name: '',
      omit: hiddenColumn,
      selector: row => {
        return <Button type="button" className="powderblue"
          onClick={() => {
            if (row.Koordinat === "")
              alertify.error("Koordinat Hatalı!")
            else {
              setSelectedRow({ state: { item: row } })
              setShowModal(true)
            }


          }}
        >
          <FontAwesomeIcon icon={faMapLocation} color={"black"} />   Harita
        </Button>
      }
    }
  ]


  function GetStations() {
    setIsLoading(true);
    axios
      .get("https://openapi.izmir.bel.tr/api/izulas/bisim/istasyonlar")
      .then((response) => {
        var res = response.data.stations.map(x => {
          x["DolulukOrani"] = (x.BisikletSayisi > 0 ? (x.BisikletSayisi * 100) / x.Kapasite : 0);
          setIsLoading(false);
          return x;
        })
        setStations(res);
        setStationsOrg(res);
      });
  }
  useEffect(() => {
    GetStations();
  }, []);


  function onChange(event) {
    var value = event.target.value
    if (value === "") {
      setHiddenColumn(true)
      value = 0;
    } else {
      setHiddenColumn(false)
    }
    var org = stationsOrg;
    var res2 = org.filter(x => parseInt(x.DolulukOrani) >= parseInt(value))
    setStations(res2);

  }
  return (
    <>
      <div className='d-flex flex-column'>
        <div className='p-2'>
         <div className='p2'>
            
         <input placeholder='Doluluk oranı girin'  type="number" onChange={(event) => onChange(event)}></input>
         </div><div>
          
          {
            isLoading
              ? <Loading type="spinningBubbles" color="black" text="Yükleniyor..." />
              : <DataTable
                columns={columns}
                data={stations}
              />
          }</div> 
        </div>
      </div>
      <ReactModal isOpen={showModal}>
        <>
          <Card className='custom-card'>
            <div class="d-flex flex-row">
              <div className='p-2'>

                <div className='d-flex justify-content-end'><Button type="button"  className="btn btn-danger" onClick={() => setShowModal(false)}><FontAwesomeIcon icon={faWindowClose} color="white" /></Button></div>
              </div>
              {/* <div className='p-2'>
                <div className='d-flex flex-column'>
                  <div className='p-2'> {selectedRow?.state?.item === undefined ? "" : <>İstasyon Kodu: {selectedRow.state.item.IstasyonID}</>}</div>
                  <div className='p-2'> {selectedRow?.state?.item === undefined ? "" : <>Bisiklet Sayısı: {selectedRow.state.item.BisikletSayisi}</>}</div>
                  <div className='p-2'> {selectedRow?.state?.item === undefined ? "" : <>Doluluk Oranı %: {parseInt(selectedRow.state.item.DolulukOrani)}</>}</div>
                  <div className='p-2'> {selectedRow?.state?.item === undefined ? "" : <>Istasyon Adı: {selectedRow.state.item.IstasyonAdi}</>}</div>
                  <br />
                </div>
              </div> */}

            </div>


          </Card>
        </>

        <MapBike data={selectedRow} ></MapBike>
      </ReactModal>
    </>

  )
}
