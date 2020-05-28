import React from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import BookmarkRow from '../components/BookmarkRow';
import { produce } from 'immer';

class MyBookmarks extends React.Component {

    state = {
        bookmarks: [],
        editIds: []
    }

    componentDidMount = async () => {
        await this.getBookmarks();
    }

    getBookmarks = async () => {
        const { data } = await axios.get('/api/bookmarks/getmybookmarks');
        this.setState({ bookmarks: data });
    }

    onUpdateClick = async (title, bookmarkId) => {
        await axios.post('/api/bookmarks/updatetitle', { title, bookmarkId });
        await this.getBookmarks();
        this.setState({ editIds: this.state.editIds.filter(id => id !== bookmarkId) });
    }

    onDeleteClick = async bookmarkId => {
        await axios.post('/api/bookmarks/delete', { bookmarkId });
        await this.getBookmarks();
    }

    onEditClick = id => {
        const editIds = [...this.state.editIds, id];
        this.setState({ editIds });
    }

    onTitleChange = (evt, id) => {
        const nextState = produce(this.state, draft => {
            const bookmark = draft.bookmarks.find(b => b.id === id);
            bookmark.title = evt.target.value;
        });
        this.setState(nextState);
    }

    onCancelClick = bookmarkId => {
        this.setState({ editIds: this.state.editIds.filter(id => id !== bookmarkId) });
    }

    render() {
        return (
            <AuthContext.Consumer>
                {value => {
                    const { user } = value;
                    return (
                        <div style={{ marginTop: 20 }}>
                            <div className="row">
                                <div className="col-md-12">
                                    <h1>Welcome back {user.firstName} {user.lastName}</h1>
                                    <Link to='/add-bookmark' className="btn btn-primary btn-block">
                                        Add Bookmark
                                    </Link>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: 20 }}>
                                <table className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Url</th>
                                            <th>Edit/Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.bookmarks.map(b => <BookmarkRow key={b.id}
                                            bookmark={b}
                                            onTitleChange={e => this.onTitleChange(e, b.id)}
                                            editMode={this.state.editIds.includes(b.id)}
                                            onEditClick={() => this.onEditClick(b.id)}
                                            onUpdateClick={() => this.onUpdateClick(b.title, b.id)}
                                            onCancelClick={() => this.onCancelClick(b.id)}
                                            onDeleteClick={() => this.onDeleteClick(b.id)}
                                        />)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }}
            </AuthContext.Consumer>
        )
    }
}

export default MyBookmarks;