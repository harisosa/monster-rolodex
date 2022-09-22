import { useState,useEffect } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
  console.log('render')
  const [searchField,setSearchField] = useState('')
  const [monsters,setMonsters] = useState([])
  const [filteredMonsters,setFilteredMonsters] = useState(monsters)
  useEffect(()=> {
    
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => setMonsters(users))
  },[])

  useEffect(()=> {
    const newFilteredMonster = monsters.filter(monster=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
    })
    setFilteredMonsters(newFilteredMonster)
  },[monsters,searchField])

  const onSearchChange= (event)=> {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  

  return(
    <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox className='search-box'
          onChangeHandler={onSearchChange} 
          placeholder='search monsters'/>
        <CardList monsters={filteredMonsters} />
      </div>
  )
}
/*
class  App extends Component{
  constructor(){
    super()
    this.state = {
      monsters:[],
      searchField : ""
    }
  }
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users)=> {
      this.setState(
        ()=> {
        return {monsters:users}
      })
    })
  }

  onSearchChange = (event)=> {     
    const searchField = event.target.value.toLocaleLowerCase()
      this.setState(()=> {
        return {searchField};
      })

  }

  render(){
    const {monsters,searchField} = this.state;
    const { onSearchChange } = this

    const filteredMonsters = monsters.filter(monster=>{
        return monster.name.toLocaleLowerCase().includes(searchField);
      })


    return (
      <div className="App">
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox className='search-box'
          onChangeHandler={onSearchChange} 
          placeholder='search monsters'/>
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }

}*/

export default App;
