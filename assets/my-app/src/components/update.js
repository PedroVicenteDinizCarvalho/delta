import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: '', name: '', address: '', selectedFile: null};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
	fetch('http://127.0.0.1/delta/index.php/studentrestcontroller/student?id=' + this.props.match.params.id)
		.then(response => {
			return response.json();
		}).then(result => {
			console.log(result);
			this.setState({
				id:result.id,
				name:result.name,
				address:result.address,
				selectedFile:result.selectedFile
			});
		});
  }
  handleChange(event) {
	  const state = this.state
	  state[event.target.name] = event.target.value
	  this.setState(state);
  }
  handleSubmit(event) {
	  event.preventDefault();
	  fetch('http://127.0.0.1/delta/index.php/studentrestcontroller/update_student', {
			method: 'PUT',
			body: JSON.stringify({
							id:this.state.id,
							name: this.state.name,
							address: this.state.address,
							selectedFile: this.state.selectedFile
			}),
			headers: {
							"Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
				if(response.status === 200) {
					alert("Student update successfully.");
				}
			});
  }
  
  render() {
    return (
			<div id="container">
			  <Link to="/">Student</Link>
				  <p/>
				  <form onSubmit={this.handleSubmit}>
					<input type="hidden" name="id" value={this.state.id}/>
						<p>
						<label>Name:</label>
							<input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
						</p>
						<p>
							<label>Endereço:</label>
							<input type="text" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Endereço" />
						</p>
						<p>
							<label>Imagem:</label>
							<input type="file" name="selectedFile" value={this.state.selectedFile} onChange={this.handleChange} placeholder="Imagem" />
						</p>
						<p>
							<input type="submit" value="Submit" />
						</p>
				  </form>
			   </div>
    );
  }
}

export default Update;