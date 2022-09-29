import React from 'react'

const PageNotFound = () => {
  return (
    <div className='position-relative' style={{minHeight:"calc(100vh - 70px)"}}>
        <h2 className='position-absolute text-secondary' style={{top:"20%",left:"20%",transform:"transform(-50%,50%)"}}>404 | NOT Found</h2>
    </div>
  )
}

export default PageNotFound