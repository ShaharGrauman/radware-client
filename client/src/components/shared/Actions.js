import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


export default class NewSignatureOrEditSignature extends React.Component {
  render() {
    return (
      <>
        <button type="button" title="Edit" class="btn btn-outline float-left " >
          <FontAwesomeIcon className="fa-lg " icon={faEdit} style={{ color: 'blue' }}></FontAwesomeIcon>
        </button>
        <button type="button" title="Delete" class="btn  btn-outline float-right" >
          <FontAwesomeIcon className="fa-lg " icon={faTrash} style={{ color: 'red' }}></FontAwesomeIcon>
        </button>
      </>
    );
  }
}