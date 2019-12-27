import React, { Component } from 'react';
import './App.css';

//import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Ade', age: 22 },
      { id: '2', name: 'Max', age: 26 },
      { id: '3', name: 'Jane', age: 28 }
    ],
    otherState: 'some other value',
    showPersons: false
  }


nameChangedHandler = (event, id) => {
  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });
  //using spread to create a copy of the person object
  const person = {...this.state.persons[personIndex]};
  //alternative approach to the spread above is below
  //const person = Object.assign({}, this.state.persons[personIndex]);

  person.name = event.target.value;

  const persons = [ ...this.state.persons ];
  persons[personIndex] = person;

  this.setState({ persons: persons })
} 

deletePersonHandler = (personIndex) => {
  //const persons = this.state.persons.slice(); //creates a new object, which is the better way. so we dont mutate original data
  const persons = [...this.state.persons]; // the ES6 spread operator: a nother way of acheiving same result.
  persons.splice(personIndex, 1);
  this.setState({persons: persons})
}

togglePersonsHandler = () => {
  const doesShow = this.state.showPersons;
  this.setState({ showPersons: !doesShow });
}

  render() {
    // const buttonStyle = {
    //   clear: 'both',
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   borderRadius: '5px',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // };

    let persons = null;

    if(this.state.showPersons) {
      persons = ( 
        <div>
          { this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)} //alternative will be this.deletePersonHandler.bind(this, index)
              name={person.name} 
              age = {person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
          
        </div> 
      );

      // buttonStyle.backgroundColor = 'red';
      // buttonStyle[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); // classes = ['red'];
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold'); //classes = ['red', 'bold'];
    }

    return (
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <button className="button" onClick={ this.togglePersonsHandler }>
            Toggle Persons
          </button>
          { persons }
        </div>
    );
    //return React.createElement('div', {class: 'App'}, React.createElement('h1', null, 'I\'m a React App'));
  //}
  }

}

export default App;