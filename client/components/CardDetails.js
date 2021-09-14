import React from 'react';
import { Link } from 'react-router-dom'

const CardDetails = () => {
    return (
        <>
        <li className="card__detail">
            <Link className="card__detail__link">
                <figure className="card__detail__pic-wrap">
                    <img src="/" alt="Travel Image"
                    className="card__detail__img" />
                </figure>
            </Link>
        </li>
        </>
    )

}

export default CardDetails;