import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import { defineMessages, injectIntl } from 'react-intl';
import Input from '../forms/input.jsx';
import InputGroup from '../input-group/input-group.jsx';
import Label from '../forms/label.jsx';
import layout from '../../lib/layout-constants';
import LayerListItemContainer from '../../containers/layer-list-item.jsx';
import styles from './layer-list.css';
import { connect } from 'react-redux';

const BufferedInput = BufferedInputHOC(Input);
const messages = defineMessages({
    costume: {
        id: 'paint.paintEditor.costume',
        description: 'Label for the name of a costume',
        defaultMessage: 'Layer'
    }
});

const LayerListComponent = props => {

    return (
        <div className={styles.layerList}>
            {/* Name field */}
            <InputGroup className={styles.layerName}>
                <MediaQuery minWidth={layout.fullSizeEditorMinWidth + (props.width - layout.referenceWidth)}>
                    <Label text={props.intl.formatMessage(messages.costume)}>
                        <BufferedInput
                            className={styles.costumeInput}
                            type="text"
                            value={props.name}
                            onSubmit={props.onUpdateName}
                        />
                    </Label>
                </MediaQuery>
                <MediaQuery maxWidth={layout.fullSizeEditorMinWidth + (props.width - layout.referenceWidth) - 1}>
                    <BufferedInput
                        className={styles.costumeInput}
                        type="text"
                        value={props.name}
                        onSubmit={props.onUpdateName}
                    />
                </MediaQuery>
            </InputGroup>
            {props.layers.map(layer =>
                <div key={layer.id} className={styles.listItemDiv}>
                    <LayerListItemContainer
                        id={layer.id}
                        name={layer.name}
                        src={layer.src}
                        image={props.image}
                        imageFormat={props.imageFormat}
                        rotationCenterX={props.rotationCenterX}
                        rotationCenterY={props.rotationCenterY}
                        onUpdateImage={props.onUpdateImage}
                    />
                </div>
            )}
            <button onClick={props.createNewLayer}></button>
        </div>
    );
};

LayerListComponent.propTypes = {
    onUpdateImage: PropTypes.func.isRequired,
    createNewLayer: PropTypes.func.isRequired,
    layers: PropTypes.array,
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(HTMLImageElement)
    ]),
    imageFormat: PropTypes.string,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number,
};

const mapStateToProps = state => ({
    layers: state.scratchPaint.layers.layers
});
export default connect(
    mapStateToProps,
)(injectIntl(LayerListComponent));