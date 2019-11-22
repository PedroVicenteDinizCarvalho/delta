import React from 'react';
import { Link } from 'react-router-dom';

class Students extends React.Component {
	constructor(props) {
		super(props);
		this.state = {students: []};
		this.headers = [
			{ key: 'id', label: 'Id'},
			{ key: 'name', label: 'Name' },
			{ key: 'address', label: 'Endereço' },
			{ key: 'selectedFile', label: 'Imagem' }
		];
		this.deleteStudent = this.deleteStudent.bind(this);
	}
	
	componentDidMount() {
		fetch('http://127.0.0.1/delta/index.php/studentrestcontroller/students')
			.then(response => {
				return response.json();
			}).then(result => {
				console.log(result);
				this.setState({
					students:result
				});
			});
	}
	
	deleteStudent(id) {
		if(window.confirm("Are you sure want to delete?")) {
			fetch('http://127.0.0.1/delta/index.php/studentrestcontroller/delete_student/' + id, {
                                method : 'DELETE'
                                   }).then(response => { 
					if(response.status === 200) {
						alert("Student deleted successfully");
                                                fetch('http://127.0.0.1/delta/index.php/studentrestcontroller/students')
						.then(response => {
							return response.json();
						}).then(result => {
							console.log(result);
							this.setState({
								students:result
							});
						});
					} 
			 });
		}
	}
	
	render() {
		return (
			<div id="container">
				<Link to="/create">Add Student</Link>
				<p/>
				<table>
					<thead>
						<tr>
						{
							this.headers.map(function(h) {
								return (
									<th key = {h.key}>{h.label}</th>
								)
							})
						}
						  <th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.students.map(function(item, key) {
							return (
								<tr key = {key}>
								  <td>{item.id}</td>
								  <td>{item.name}</td>
								  <td>{item.address}</td>
								  <td>{item.selectedFile}</td>
								  <td>
										<Link to={`/update/${item.id}`}>Edit</Link>
										 
										<a href="javascript:void(0);" onClick={this.deleteStudent.bind(this, item.id)}>Delete</a>
								  </td>
								</tr>
											)
							}.bind(this))
						}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Students;