import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import Input from '../forms/input.jsx';
import InputGroup from '../input-group/input-group.jsx';
import Label from '../forms/label.jsx';
import styles from './precise-trans.css';

import propTypes from 'prop-types';

const BufferedInput = BufferedInputHOC(Input);

const PreciseTransComp = props => {
    return (
        <div className={styles.inputs}>
            <InputGroup>
                <Label text={"x"}>
                    <BufferedInput
                        className={styles.numeralInput}
                        type="number"
                        value={Math.floor(props.x)}
                        onSubmit={props.onTransXChange}
                    />
                </Label>
                <Label text={"y"}>
                    <BufferedInput
                        className={styles.numeralInput}
                        type="number"
                        value={Math.floor(props.y)}
                        onSubmit={props.onTransYChange}
                    />
                </Label>
            </InputGroup>
        </div>
    );
};

PreciseTransComp.propTypes = {
    onTransXChange: PropTypes.func.isRequired,
    onTransYChange: PropTypes.func.isRequired,
    x: propTypes.number,
    y: propTypes.number,
};

export default (PreciseTransComp);
