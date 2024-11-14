import React, { useState } from 'react'

export default function EmergencyManagement() {
  const [alert, setalert] = useState({
    alertType:"",
    alertDescription:""
  })
  console.log(alert)
 
  return (
    <div style={{ height: "85vh", alignItems: "center", overflow: "hidden" }} className="div  d-flex justify-content-center   ">

      <div className='alert-page'>

        <div className="alert">
          <h2 className='alert-title'>
            Alert
          </h2>
          <label className='alert-labal '>
            Alert Type <span className='alert-univasel'>*</span>
          </label>
          <select value={alert.alertType} onChange={(e)=>setalert({
              ...alert,alertType:e.target.value
            })} className="form-select  input-text mt-1  input-style" required>
            <option >Select alert</option>
            <option value={"Emergency"}>Emergency</option>
            <option value={"Warning"}>Warning</option>
            <option value={"EarthQuack"}>Earth Quack</option>
            <option value={"HighWinds"}>High Winds</option>
            <option value={"Thunder"}>Thunder</option>
          </select>
          <label className='alert-labal mt-4 ms-1 '>
            Description <span className='alert-univasel'>*</span>
          </label>
          <textarea onChange={(e)=>setalert({
            ...alert,alertDescription:e.target.value
          })} type="text" className="form-control  input-text input-style" cols={2} placeholder=" emergency description." />

          <button disabled={!alert.alertType || !alert.alertDescription} className='  mt-5 w-100 alert-send-btn '>Send</button>
        </div>
      </div>
    </div>
  )
}
