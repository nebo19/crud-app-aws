import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Table } from 'rsuite';
import Create from './Create';
import Edit from './Edit';
import './App.css';
import Details from './Details';
import Remove from './Delete';

const { Column, HeaderCell, Cell } = Table;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleToUpdate = this.handleToUpdate.bind(this);
    this.state = { data: []
    };  
  }

  handleToUpdate= (updatedData) => {
    this.setState({ data: updatedData })
  } 

  callServer() {
    fetch("") //Loadbalancer DNS Name (dont forget http://)
        .then(res => res.json())
        .then(res => this.setState({ data: res }))
        .catch(err => err);
  }
  componentDidMount() {
    this.callServer();
  }

  render() {
    var handleToUpdate  =  this.handleToUpdate;
    return (
      <div >
        <Table
          height={400}
          data={this.state.data}
        >
          <Column width={200} resizable>
            <HeaderCell >Ime</HeaderCell>
            <Cell dataKey="Ime" />
          </Column>
          <Column width={200} resizable>
            <HeaderCell>Prezime</HeaderCell>
            <Cell dataKey="Prezime" />
          </Column>
          <Column width={300} resizable>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="Email" />
          </Column>
          <Column width={200} resizable>
            <HeaderCell>Telefon</HeaderCell>
            <Cell dataKey="Telefon" />
          </Column>
          <Column width={100} align="center">
            <HeaderCell >Action</HeaderCell>  
            <Cell>    
              {rowData => {

                return (
                  <span>
                    <Details details={rowData}></Details>
                    <Edit details={rowData} handleToUpdate = {handleToUpdate.bind(this)} data={this.state.data}></Edit>
                    <Remove details={rowData} handleToUpdate = {handleToUpdate.bind(this)} data={this.state.data}></Remove>
                  </span>
                );
              }}
            </Cell>
          </Column>
          <Column width={200} align="center">
            <HeaderCell><Create handleToUpdate = {handleToUpdate.bind(this)} data={this.state.data}></Create></HeaderCell>
            <Cell>
            </Cell>
          </Column>
        </Table>
      </div>
      
    );
  }
}

export default App; 