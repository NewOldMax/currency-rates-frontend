import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const styles = {
    margin: {
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
    },
};

class Chart extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState || this.props !== nextProps;
    }

    render() {
        const data = this.props.rates.reverse().map(rate => ({
            name: rate.date,
            value: rate.amount,
        }));
        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    width={600}
                    height={300}
                    data={data}
                    margin={styles.margin}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

Chart.propTypes = {
    rates: PropTypes.array,
};

export default Chart;
