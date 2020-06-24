import React, { Component } from 'react';
import {Table, TableHead, TableCell, TableRow} from '@material-ui/core';
import {Modal, ModalHeader, ModalBody, ModalFooter, Input,Label,Button } from 'reactstrap';
import Axios from 'axios';
import {Link} from 'react-router-dom'
class Dashboard extends Component {
    state = {
        data: [],
        openModal: false,
        selectedId: null
    }

    componentDidMount() {
        Axios.get(`http://localhost:5000/barang`)
        .then((res) => {
            console.log(res.data)
            this.setState({data: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getProudcts = () => {
        let {data,selectedId} = this.state; 
        return data.map((val) => {
            if(val.id === selectedId) {
                return (
                    <TableRow>
                        <TableCell>
                        {val.id}
                        </TableCell>
                    <TableCell>
                        <Input defaultValue={val.nama} innerRef={(nama) => this.nama = nama}/>
                    </TableCell>
                    <TableCell>
                        <Input defaultValue={val.harga} innerRef={(harga) => this.harga = harga}/>
                    </TableCell>
                    <TableCell>
                        <Button color="warning" onClick={() => this.setState({selectedId: null})}>
                            Cancel
                        </Button>
                        <Button color="danger" onClick={() => this.editProducts(val.id)}>
                            Confirm
                        </Button>
                    </TableCell>
                    </TableRow>
                )
            }
            return(
                <TableRow>
                    <TableCell>{val.id}</TableCell>
                    <TableCell>{val.nama}</TableCell>
                    <TableCell>Rp. {val.harga.toLocaleString()}</TableCell>
                    <TableCell>
                         <Button color="warning" onClick={() => this.setState({selectedId: (val.id)})}>Edit</Button>
                         <Button color="danger" onClick={() => this.deleteProducts(val.id)}>Delete</Button>
                     </TableCell>
                </TableRow>
            )
        })
    }
   

    addProducts = () => {
        let nama = this.nama.value;
        let harga = this.harga.value;
        let data = {
            nama,
            harga
        }
        if(nama && harga) {
            Axios.post(`http://localhost:5000/barang`, data)
            .then((res) => {
                console.log(res.data)
                Axios.get(`http://localhost:5000/barang`)
                .then((res) => {
                    this.setState({data: res.data, openModal: false})
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    deleteProducts = (id) => {
        Axios.delete(`http://localhost:5000/barang/${id}`)
        .then((res) => {
            Axios.get('http://localhost:5000/barang')
            .then((res) => {
                this.setState({data: res.data})
                alert('delete sukses')
            })
        })
    }

    editProducts = (id) => {
        let nama = this.nama.value;
        let harga = this.harga.value;
        let data = {
            nama,
            harga
        }
        Axios.patch(`http://localhost:5000/barang/${id}`, data)
        .then((res) => {
            console.log(res.data)
            Axios.get('http://localhost:5000/barang')
            .then((res) => {   
                this.setState({data: res.data, selectedId: null})
                alert('Edit Successfull')
            })
        })
    }

    onBtnLogout = () => {
        localStorage.removeItem('user')
    }
    render() { 
        let {openModal} = this.state;
        return (
            <div>     
            <Button color="success" style={{marginTop: "80px", marginLeft: "50px"}} onClick={()=> this.setState({openModal:true})}> Add Products</Button>
            <Link to='/login'>
            <Button color="danger" style={{marginTop: "80px", marginLeft: "50px"}} onClick={this.onBtnLogout}>Logout</Button>
            </Link>
            <Modal isOpen={openModal}>
                <ModalHeader>Tambah Data Barang</ModalHeader>
                    <ModalBody>
                        <Label>
                            Nama
                        </Label>
                        <Input type="text" innerRef={(nama) => this.nama = nama}/>
                        <Label>
                            Harga
                        </Label>
                        <Input type="text" innerRef={(harga) => this.harga = harga}/>
                       
                    </ModalBody>

                    <ModalFooter>
                    <Button color="primary" onClick={this.addProducts}>Confirm</Button>
                    <Button color="warning" onClick={() => this.setState({openModal:false})}>Cancel</Button>
                    </ModalFooter>
            </Modal>
            <br></br>
            <Table>
               {this.getProudcts()}
                <TableHead>
                    <TableCell>NO</TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Harga</TableCell>
                    <TableCell>Actions</TableCell>
                </TableHead>
            </Table>
        </div>
          );
    }
}
 
export default Dashboard;