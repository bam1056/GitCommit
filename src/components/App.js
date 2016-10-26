import React, { Component } from 'react'
import '../styles/screen.sass'

class App extends Component {
  constructor () {
    super()
    this.state = {
      stuff: []
    }
  }
  componentDidMount () {
    window.fetch('http://localhost:3000/userlist', {method: 'GET'})
    .then(res => res.json())
    .then(data => this.setState({stuff: JSON.stringify(data)}))
  }

  updateCollection () {
    window.fetch('http://localhost:3000/userlist', {method: 'GET'})
    .then(res => res.json())
    .then(data => this.setState({stuff: JSON.stringify(data)}))
  }

  handleClick = (event) => {
    let userName = document.getElementById('username')
    let email = document.getElementById('email')
    console.log(userName.value, email.value)
    const body = JSON.stringify({
      username: userName.value,
      useremail: email.value
    })
    window.fetch('http://localhost:3000/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length
      },
      body: body
    })
    .then(res => res.json())
    .then(json => {
      console.log('PROMISE RESOLVED', json)
      this.updateCollection()
      userName.value = ''
      email.value = ''
    })
  }

  render () {
    let { stuff } = this.state
    let users = stuff.length > 0 ? JSON.parse(stuff).map(user => {
      return <ul key={user._id}>
        <li>{user._id}</li>
        <li>{user.username}</li>
        <li>{user.email}</li>
      </ul>
    }) : 'Awaiting Response'
    return <div>
      <h1>Hello, World!</h1>
      {users}
      <form id='addUser' name='addUser'>
        <input id='username' type='text' name='username' placeholder='Username' />
        <input id='email' type='text' name='email' placeholder='Username' />
        <input type='button' name='submit' value='Add New User' onClick={this.handleClick} />
      </form>
    </div>
  }
}

export default App
