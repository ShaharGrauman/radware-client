// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSort } from "@fortawesome/free-solid-svg-icons";
// import axios from 'axios';
// import { getpermissionNew } from '../../api/controllers/admin';

// /**
//  * Permissions aren't dynamic because it has to be supported in client and server.
//  * If permissions were dynamic, then how can we force its usage without changing the code?
//  * So when a new permission is needed, it must be added here and whenever necessary on client/server code
//  */
// function TableHeader(props) {
//   return (
//     <th scope="col">
//       {props.header}
//       <FontAwesomeIcon
//     icon={faSort}
//     onClick={() => props.sortOn(props.header)}
//   ></FontAwesomeIcon>
//     </th>
//   );
// }

// export default class PermissionsTable extends React.Component {
//   constructor(props) {
//     super(props);
    
//     this.state = {
//       permissions: []
//     };
 
//   }
//   async componentDidMount() {
//     const permissionRole = await getpermissionNew()
//         const permissions = permissionRole.map(permission => ({
//           ...permission
//           //, 
//           // roles: user.roles.map(role => role.description).join(','),
//         }));
//         this.setState({permissions: permissions });
      
//   }
//   // componentDidMount() {
//   //   axios.get(`http://localhost:3001/role/permissions`, (req, res) => res.json()
//   //   ).then(res => {
//   //       const permissions = res.data.map(permission => ({
//   //         ...permission
//   //         //, 
//   //         // roles: user.roles.map(role => role.description).join(','),
//   //       }));

//   //       this.setState({permissions: permissions });
//   //     });
//   // }
  
//   // componentDidMount(){
//   //   //fetch permissions from db
//   //   this.setState({
//   //     permissions: [
//   //       {id: 1, name: 'Researcher dashboard'},
//   //       {id: 2, name: 'Create/update signature'},
//   //       {id: 3, name: 'Search signatures'},
//   //       {id: 4, name: 'Export signatures'},
//   //       {id: 5, name: 'Update signature status'},
//   //       {id: 6, name: 'QA dashboard'},
//   //       {id: 7, name: 'Update QA performance internal status'},
        
//   //     ]
//   //   });
//   // }

//   render() {
//     return (
//         <table className="table table-striped table-hover table-bordered border-dark"
//         style={{ borderWidth: "3px", textAlign:'center' }}>
//         <thead>
//             <tr class="m-0">
//                 <th class="w-50">Avaliable permissions</th>
//                 <th class="w-50">Select</th>
//             </tr>
//         </thead>
//         <tbody>
//             {
//               this.state.permissions.map(p => <tr class="m-0">
//                   <td class="w-25">{p.name}</td>
//                   <td class="w-25" >
//                     <input type="checkbox" onChange={() => this.props.onSelect(p.id)} />
//                   </td>
//               </tr>)
//             }
//         </tbody>
//     </table>
//     );
//   }
// }


import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { getpermissionNew } from '../../api/controllers/admin';

/**
 * Permissions aren't dynamic because it has to be supported in client and server.
 * If permissions were dynamic, then how can we force its usage without changing the code?
 * So when a new permission is needed, it must be added here and whenever necessary on client/server code
 */
function TableHeader(props) {
  return (
    <th scope="col">
      {props.header}
      <FontAwesomeIcon
        icon={faSort}
        onClick={() => props.sortOn(props.header)}
      ></FontAwesomeIcon>
    </th>
  );
}

export default class PermissionsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      permissions: [],
      permission: []
    };

  }
  async componentDidMount() {
    const permissions = await getpermissionNew()
    const { permissions: userPermissions } = this.props.role;
    console.log({ Userpermission: userPermissions });

    this.setState({ permissions });
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
                <input type="checkbox" defaultChecked={this.props.role.permissions.some(permission => permission.id == p.id)} onChange={() => this.props.onSelect(p.id)} />
              </td>
            </tr>)
          }
        </tbody>
      </table>
    );
  }
}
