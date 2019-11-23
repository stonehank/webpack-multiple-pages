import React from 'react'

export default class Homepage extends React.Component {
  constructor() {
    super()
    this.state = {
      title: 'React title for homepage'
    }
  }

  render() {
    const {title}=this.state
    return (
      <h2>{title}</h2>
    )
  }
}
