import React from 'react';



 const Input=({ref,name,type,lable,value,error,onChange}) =>{
    return( 
        <div className="form-group" >
<label htmlFor={name}>{lable}</label>
<input
size="145"
defaultValue={value}
onChange={onChange}
id={name}
name={name}
type={type}
ref={ref}
className="form-group"
/>
{error && <div className="alert alert-danger">{error}</div>}


        </div>
    );
};


export default Input;