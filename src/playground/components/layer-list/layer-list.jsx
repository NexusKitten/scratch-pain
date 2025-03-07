import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

import BufferedInputHOC from '../../../components/forms/buffered-input-hoc.jsx';
import { defineMessages, injectIntl } from 'react-intl';
import Input from '../../../components/forms/input.jsx';
import InputGroup from '../../../components/input-group/input-group.jsx';
import Label from '../../../components/forms/label.jsx';
import layout from '../../../lib/layout-constants.js';
import LayerListItemContainer from '../../containers/layer-list-item.jsx';
import styles from './layer-list.css';

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
            {Object.entries(props.allLayerData).map(layer =>
            <div key={Number(layer[0])} className={styles.listItemDiv}>
                <LayerListItemContainer
                        id={Number(layer[0])}
                        name={layer[1].name}
                        src={layer[1].image}
                        setActiveLayer={props.setActiveLayer}
                />
            </div>
            )}
            <button onClick={props.createNewLayer}></button>
        </div>
    );
};

LayerListComponent.propTypes = {
    getLayerData: PropTypes.func.isRequired,
    allLayerData: PropTypes.object,
    setActiveLayer: PropTypes.func.isRequired,
    createNewLayer: PropTypes.func.isRequired,
    name: PropTypes.string
};

export default (injectIntl(LayerListComponent));