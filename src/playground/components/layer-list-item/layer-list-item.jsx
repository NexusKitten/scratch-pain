import React from 'react';
import MediaQuery from 'react-responsive';
import { Fragment } from 'react';

import BufferedInputHOC from '../../../components/forms/buffered-input-hoc.jsx';
import { defineMessages, injectIntl } from 'react-intl';
import Input from '../../../components/forms/input.jsx';
import InputGroup from '../../../components/input-group/input-group.jsx';
import Label from '../../../components/forms/label.jsx';
import layout from '../../../lib/layout-constants.js';
import styles from './layer-list-item.css';

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
        <div key={props.id} className={styles.listItem}>
            <span className={styles.layerName}>{props.name}</span>
        </div>
    );
};

export default (injectIntl(LayerListComponent));