import React from 'react';
import { connect } from 'react-redux';

class AddPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            price: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this)
    }

    onSubmit = (event) => {
		event.preventDefault();
        console.log(this.state.price,this.state.description)
		

	};

    onChange = (event)=> {
        this.setState({
            [event.target.name]:event.target.value
        })

    }

    render() {
        return (
        
            <form onSubmit={this.onSubmit}>
                <div>
                    <label for='description'>Description: </label>
                    <input onChange={this.onChange}name = "description" value = {this.state.description} type="text"/>
                </div>

                <div>
                    <label for='price'>Amount: $</label>
                    <input onChange={this.onChange} name= "price"  value ={this.state.price} type="number"/>
                </div>

                <div>
                    <button type='submit'>
                        Add
                    </button>
                </div>

            </form>
        )
    }
}

export default AddPrice;