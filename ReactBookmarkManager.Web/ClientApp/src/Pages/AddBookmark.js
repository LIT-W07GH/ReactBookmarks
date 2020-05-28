import React from 'react';
import produce from 'immer';
import axios from 'axios';

class AddBookmark extends React.Component {
    state = {
        url: '',
        title: ''
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;
        });

        this.setState(nextState);
    }

    onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmarks/add', this.state);
        this.props.history.push('/my-bookmarks');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3 well">
                    <h3>Add Bookmark</h3>
                    <form onSubmit={this.onFormSubmit}>
                        <input onChange={this.onTextChange} type="text" name="title" placeholder="Title" className="form-control" />
                        <br />
                        <input onChange={this.onTextChange} type="text" name="url" placeholder="Url" className="form-control" />
                        <br />
                        <button className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddBookmark;