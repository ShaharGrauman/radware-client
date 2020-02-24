import React from "react";
import { getpermissionNew } from '../../api/controllers/admin';


/**
 * Permissions aren't dynamic because it has to be supported in client and server.
 * If permissions were dynamic, then how can we force its usage without changing the code?
 * So when a new permission is needed, it must be added here and whenever necessary on client/server code
 */

export default class PermissionsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      permissions: [],
      checkBoxError:false
    };

  }
  async componentDidMount() {
    console.log(this.props.isEdit);
    const permissionRole = await getpermissionNew();
    const permissions = permissionRole.map(permission => ({
        ...permission
      }));
      this.setState({permissions: permissions });

}
valthischeckBox = ()=> {
  var checkboxs=document.getElementsByName("myTextEditBox");
 
  for(var i=0,l=checkboxs.length;i<l;i++)
  {
      if(checkboxs[i].checked)
      {   this.setState({checkBoxError:false})
          return true;
          
          break;
      }
  }
  this.setState({checkBoxError:true})
  return false; 
 
}

 

  render() {
    return (
      <table className="table table-striped table-hover table-bordered border-dark"
        style={{ borderWidth: "3px", textAlign: 'center' }}>
        <thead>
          <tr class="m-0">
            <th class="w-50">Avaliable permissions</th>
            <th class="w-50">Select</th>
          </tr>
        </thead>
        <tbody>

            {
              this.state.permissions.map(p => <tr class="m-0">
                  <td class="w-25">{p.name}</td>
                  <td class="w-25" >
                    {this.props.isEdit &&
                    <input type="checkbox" defaultChecked= {this.props.role.permissions.some(permission => permission.id == p.id)} onChange={() => this.props.onSelect(p.id)} />
                    }
                    {this.props.isNew &&
                    <input type="checkbox" name="myTextEditBox" onChange={() => this.props.onSelect(p.id)} />
                    }
                  </td>
              </tr>)
            }

        </tbody>
      </table>
    );
  }
}
