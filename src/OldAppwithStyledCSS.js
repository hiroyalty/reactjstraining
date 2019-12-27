import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

//import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';

const StyledButton =  styled.button`
  clear: both;
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alt ? 'lightgreen' : 'salmon'};
    color: black;
  }
`;

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
          <StyledButton 
            alt = { this.state.showPersons }
            onClick={ this.togglePersonsHandler }>Toggle Persons
          </StyledButton>
          { persons }
        </div>
    );
    //return React.createElement('div', {class: 'App'}, React.createElement('h1', null, 'I\'m a React App'));
  //}
  }

}

export default App;

/*
The same component as above in its functional model of programming

const app = props => {
  //useState returns two elements when used: first is an array of present
  //values and the second is a function that will be used to update the values(state)
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Ade', age: 22 },
      { name: 'Max', age: 26 },
      { name: 'Jane', age: 28 }
    ],
    otherState: 'some other value'
  });

  const [otherAddState, setOtherAddState] = useState( 'more additional States' )

  console.log(personsState, otherAddState);

  const switchNameHandler = () => {
    //console.log('was clicked');
    // DONT DO THIS: this.state.persons[0].name = 'NewName';
    setPersonsState( {
      persons: [
        { name: 'Ayokunle', age: 32 },
        { name: 'John Terry', age: 26 },
        { name: 'Campbell', age: 38 }
      ],
      otherState: personsState.otherState
    })
  }
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={switchNameHandler}>Switch Name</button>
        <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
        <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Racing</Person>
        <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
      </div>
    );
    //return React.createElement('div', {class: 'App'}, React.createElement('h1', null, 'I\'m a React App'));
}
*/