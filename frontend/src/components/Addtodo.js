import React, { Component } from 'react'
import { Consumer } from '../context'
import axios from "axios"

export default class Addtodo extends Component {
    state = {
        id: 4,
        title: "",
        complete: 0
    }
    update = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    add = (dispatch, e) => {
        e.preventDefault()
        const newTodo = this.state
        axios.post("/todos", newTodo)
            .then(res => dispatch({ type: 'ADD', payload: res.data }))
        this.setState({ title: "" })
    }
    render() {
        return (
            <Consumer>{value => {
                const { dispatch } = value
                return <form onSubmit={this.add.bind(this, dispatch)}>
                    <div className='container'>
                        <div className='row'>
                            <input type="text" className='ht form-control rounded-0' required placeholder='write your task' onChange={this.update} value={this.state.title} />

                            <button className='htt form-control rounded-0 btn-secondary' type='submit'>+</button>
                        </div>
                    </div>
                </form>
            }}

            </Consumer>

        )
    }
}
