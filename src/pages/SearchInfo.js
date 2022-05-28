import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import alertify from 'alertifyjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'alertifyjs/build/css/alertify.css';
import { Button } from 'react-bootstrap';

export default function SearchInfo() {

  const [stations, setStations] = useState([]);
  const [stationsOrg, setStationsOrg] = useState([]);
  const navigate = useNavigate();
  const columns = [
    {
      name: 'Istasyon ID',
      selector: row => row.IstasyonID,
    },
    {
      name: 'Istasyon Adi',
      selector: row => row.IstasyonAdi,
    },
    {
      name: 'Bisiklet Sayisi',
      selector: row => row.BisikletSayisi,
    },
    {
      name: 'Kapasite',
      selector: row => row.Kapasite,
    },
    {
      name: 'Doluluk Orani',
      selector: row => row.DolulukOrani,
    },
    {
      name: 'Koordinat',
      selector: row => row.Koordinat,
    },
    {
      name: '',
      selector: row => {
        return <Button
          onClick={() => {
            if (row.Koordinat === "")
              alertify.error("Hatalı Koordinat!")
            else
              navigate('/mapbike',
                { state: { item: row } })
          }}
        >
          Haritada Göster
        </Button>
      }
    }
  ]


  function GetStations() {
    axios
      .get("https://openapi.izmir.bel.tr/api/izulas/bisim/istasyonlar")
      .then((response) => {
        var res = response.data.stations.map(x => {
          x["DolulukOrani"] = (x.BisikletSayisi > 0 ? (x.BisikletSayisi * 100) / x.Kapasite : 0);
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
    if (value === "")
      value = 0;
    var org = stationsOrg;
    var res2 = org.filter(x => parseInt(x.DolulukOrani) >= parseInt(value))
    setStations(res2)
  }
  return (
    <>
      <div className='d-flex flex-column'>
        <div className='p-2'>
          <input placeholder='Doluluk oranı girin' type="number" onChange={(event) => onChange(event)}></input>
          <DataTable
            columns={columns}
            data={stations}
          />
        </div>
      </div>
    </>

  )
}
