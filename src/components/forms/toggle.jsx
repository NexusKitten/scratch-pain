import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './toggle.css';

const Input = props => {
    return (
        <label className={styles.container}>
            <input
                type="checkbox"
                {...props}
                className={classNames(
                    styles.toggle,
                    props.className,
                )}
            />
            <span className={styles.checkmark}></span>
        </label>
    );
};

Input.propTypes = {
    className: PropTypes.string,
};

export default Input;
