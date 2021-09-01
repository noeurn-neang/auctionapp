import React from 'react';
import { Pagination } from 'react-bootstrap';

const SimplePagination = ({
    active,
    perPage,
    total,
    handleClick
}) => {
    let items = [];
    for (let number = 1; number <= Math.ceil(total / perPage); number++) {
        items.push(
            <Pagination.Item
                onClick={() => {
                    handleClick(number);
                }}
                key={number} 
                active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    )
}

export default SimplePagination;