import React from "react";

import "./Modal.css";

const modal = props => {
  const cssClasses = [
    "Modal",
    props.show ? "ModalOpen" : "ModalClosed"
  ];

  return (
    <div className={cssClasses.join(' ')}>
      <h5 className="text-danger">Are you sure to update the signature ?</h5>
      <div>
         <button type="button" class="btn btn-outline-danger btn-block mb-2" onClick={props.clickYesUpdated}>Yes</button>
      </div>
       <div>
           <button type="button" class="btn btn-outline-secondary btn-block" onClick={props.closed}>Cancel</button>
       </div>
    
    </div>
  );
};

export default modal;
