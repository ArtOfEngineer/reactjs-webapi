
import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';

export class Department extends Component {

    constructor(props){
        super(props);
        this.state ={deps:[], addModalShow : false, editModalShow : false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
       fetch('http://localhost:49902/api/department')
       .then(response=> response.json())
       .then(data => {
        this.setState({deps:data});
       }
        );
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch('http://localhost:49902/api/department/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }

    render(){
        
    const {deps, depid, depname} = this.state;
    let addModalClose =() => this.setState({addModalShow:false});
    let editModalClose =() => this.setState({editModalShow:false});

        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>DepartmentID</th>
                    <th>DepartmentName</th>
                    <th>Option</th>
                </tr>
            </thead>
            <tbody>
                {deps.map(dep=>
                   <tr key ={dep.DepartmentID}> 
                   <td>{dep.DepartmentID}</td>
                   <td>{dep.DepartmentName}</td>
                   <td>
<ButtonToolbar>
<Button
className="mr-2" variant="info"
onClick= {()=> this.setState({editModalShow:true, depid:dep.DepartmentID, depname:dep.DepartmentName})}
>
    Edit
</Button>

<Button className="mr-2" 
onClick={()=> this.deleteDep(dep.DepartmentID)} 
variant="danger"
>Delete</Button>

<EditDepModal
show = {this.state.editModalShow}
onHide={editModalClose}
depid = {depid}
depname = {depname}
/>

</ButtonToolbar>

                   </td>
                   </tr>
                   )}
            </tbody>
            </Table>
<ButtonToolbar>
    <Button
    variant='primary'
    onClick={()=> this.setState({addModalShow: true})} 
    >Add Department</Button>

    <AddDepModal
    show={this.state.addModalShow}
    onHide={addModalClose}
    />

</ButtonToolbar>
</div>
        )
    }

}