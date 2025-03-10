import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import LiveInputHOC from '../forms/live-input-hoc.jsx';
import Input from '../forms/input.jsx';
import InputGroup from '../input-group/input-group.jsx';
import Label from '../forms/label.jsx';
import styles from './precise-trans.css';
import TWRenderRecoloredImage from '../../tw-recolor/render.jsx';
import rotateIcon from '!../../tw-recolor/build!./icons/rotate.svg';
import scaleIcon from '!../../tw-recolor/build!./icons/scale.svg';
import translateIcon from '!../../tw-recolor/build!./icons/translate.svg';

const LiveInput = LiveInputHOC(Input);

const PreciseTransComp = props => {
    return (
        <div className={styles.editorTopBar}>
            <div className={styles.inputs}>
                <InputGroup className={styles.modDashedBorder}>
                    <TWRenderRecoloredImage
                        alt={"translate"}
                        className={classNames(styles.editFieldIcon)}
                        draggable={false}
                        src={translateIcon}
                        title={"translate"}
                    />
                    <Label text={"x:"}>
                        <LiveInput
                            className={styles.numeralInput}
                            type="number"
                            value={Math.floor(props.x)}
                            onSubmit={props.onTransXChange}
                        />
                    </Label>
                    <Label text={"y:"}>
                        <LiveInput
                            className={styles.numeralInput}
                            type="number"
                            value={Math.floor(props.y)}
                            onSubmit={props.onTransYChange}
                        />
                    </Label>
                </InputGroup>
                <InputGroup>
                    <TWRenderRecoloredImage
                        alt={"rotate"}
                        className={classNames(styles.editFieldIcon)}
                        draggable={false}
                        src={rotateIcon}
                        title={"rotate"}
                    />
                    <LiveInput
                        className={styles.numeralInput}
                        type="number"
                        value={Math.floor(props.rot)}
                        onSubmit={props.onRotChange}
                    />
                </InputGroup>
            </div>
            <div className={styles.inputs}>
                <InputGroup className={styles.modDashedBorder}>
                    <TWRenderRecoloredImage
                        alt={"scale"}
                        className={classNames(styles.editFieldIcon)}
                        draggable={false}
                        src={scaleIcon}
                        title={"scale"}
                    />
                    <Label text={"x:"}>
                        <LiveInput
                            className={styles.numeralInput}
                            type="number"
                            value={Math.floor(props.width)}
                            onSubmit={props.onWidthChange}
                        />
                    </Label>
                    <Label text={"y:"}>
                        <LiveInput
                            className={styles.numeralInput}
                            type="number"
                            value={Math.floor(props.height)}
                            onSubmit={props.onHeightChange}
                        />
                    </Label>
                </InputGroup>
            </div>
        </div>
    );
};

PreciseTransComp.propTypes = {
    onTransXChange: PropTypes.func.isRequired,
    onTransYChange: PropTypes.func.isRequired,
    onRotChange: PropTypes.func.isRequired,
    onWidthChange: PropTypes.func.isRequired,
    onHeightChange: PropTypes.func.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    rot: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default (PreciseTransComp);
