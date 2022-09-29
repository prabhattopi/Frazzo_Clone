import { useDispatch } from 'react-redux'

import React from "react"
import { ALERT } from '../../Redux/alert/alerts'


const Toast = ({title, body, bgColor}) => {

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch({ type: ALERT, payload: {} })
  }


    return (
        <>
        <div className={`toast show position-fixed text-light ${bgColor}`}
    style={{top: '5px', right: '5px', zIndex: 990, minWidth: '200px'}}>

      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="me-auto">{title}</strong>
        <button type="button" className="btn-close" 
        data-bs-dismiss="toast" aria-label="Close"
        onClick={handleClose} />
      </div>

      <div className="toast-body">
        {
          typeof(body) === 'string'
          ? body
          : <ul>
            {
              body.map((text, index) => (
                <li key={index}>{text}</li>
              ))
            }
          </ul>
        }
      </div>

    </div>
       
        </>
      )
        

 
}

export default Toast