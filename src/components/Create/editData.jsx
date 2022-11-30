import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://localhost:3000/posts/";

class crudEmpresas extends Component {
state={
  data:[],
  Insertar: false,
  modalEliminar: false,
  form:{
    id: '',
    nombre: '',
    logo: '',
    ranking: '',
    comentario: ''
  }
}

empresasGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

empresasPost=async()=>{
  delete this.state.form.id;
 await axios.post(url,this.state.form).then(response=>{
    this.Insertar();
    this.empresasGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

empresasPut=()=>{
  axios.put(url+this.state.form.id, this.state.form).then(response=>{
    this.Insertar();
    this.empresasGet();
  })
}

empresasDelete=()=>{
  axios.delete(url+this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.empresasGet();
  })
}

Insertar=()=>{
  this.setState({Insertar: !this.state.Insertar});
}

seleccionarEmpresa=(empresa)=>{
  this.setState({
    form: {
      id: empresa.id,
      nombre: empresa.nombre,
      logo: empresa.logo,
      ranking: empresa.ranking,
      comentario: empresa.comentario
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.empresasGet();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, comentario: 'insertar'}); this.Insertar()}}>Create Company</button>
    <table className="table">
      <thead>
        <tr lassName="Apps">
          <th>ID</th>
          <th>Name</th>
          <th>Logo</th>
          <th>ranking</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(empresa=>{
          return(
            <tr>
          <td>{empresa.id}</td>
          <td>{empresa.nombre}</td>
          <td><img className='img' src={empresa.logo} alt="" /></td>
          <td>{empresa.ranking}</td>
          <td>{empresa.comentario}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(empresa); this.Insertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(empresa); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.Insertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.Insertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombre">Name</label>
                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre: ''}/>
                    <br />
                    <label htmlFor="nombre">Logo</label>
                    <input className="form-control" type="text" name="logo" id="logo" onChange={this.handleChange} value={form?form.logo: ''}/>
                    <br />
                    <label htmlFor="ranking">Ranking</label>
                    <input className="form-control" type="text" name="ranking" id="ranking" onChange={this.handleChange} value={form?form.ranking:''}/>
                    <label htmlFor="ranking">Comment</label>
                    <input className="form-control" type="text" name="comentario" id="comentario" onChange={this.handleChange} value={form?form.comentario:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.comentario =='insertar'?
                    <button className="btn btn-primary" onClick={()=>this.empresasPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.empresasPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.Insertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
            Are you sure you want to delete this company <strong>{form && form.nombre}</strong>? 
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.empresasDelete()}>Yes</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default crudEmpresas;