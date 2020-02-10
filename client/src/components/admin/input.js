import React from 'react';



 const Input=({ref,name,type,lable,value,error,onChange}) =>{
    return( 
        <div className="form-group" >
<lable htmlFor={name}>{lable}</lable>
<input
size="115"
value={value}
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