import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    state = {
        topBookmarks: []
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/bookmarks/topfive');
        this.setState({ topBookmarks: data });
    }

    render() {
        return (
            <div>
                <h1>Welcome to the React Bookmark Application.</h1>
                <h3>Top 5 most bookmarked links</h3>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Url</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.topBookmarks.map(b => <tr key={b.url}>
                            <td>
                                <a href={b.url} target="_blank">{b.url}</a>
                            </td>
                            <td>
                                {b.count}
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Home;