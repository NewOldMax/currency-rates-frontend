import React from 'react';
import HeaderStore from '../stores/HeaderStore';

const style = {
    header: {
        backgroundColor: '#097b67',
        color: '#fff',
        padding: '20px',
    },
};

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
        };
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        HeaderStore.addChangeListener(this._onChange);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState || this.props !== nextProps;
    }

    componentWillUnmount() {
        HeaderStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            title: HeaderStore.getTitle(),
        });
    }


    render() {
        const { title } = this.state;

        return (
            <div style={style.header}>
                <h1>{title}</h1>
            </div>
        );
    }
}

export default Header;
