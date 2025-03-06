import React from 'react';
import MediaQuery from 'react-responsive';
import { Fragment } from 'react';

import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import { defineMessages, injectIntl } from 'react-intl';
import Input from '../forms/input.jsx';
import InputGroup from '../input-group/input-group.jsx';
import Label from '../forms/label.jsx';
import layout from '../../lib/layout-constants';
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

const listoflayers = [
    { id: 1, name: 'meow', body: "It's been a while since I posted..." },
    { id: 2, name: 'Layer 2', body: 'I am starting a new blog!' },
    { id: 3, name: 'Layer 3', body: 'I am starating a new blog!' }
];

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
            {listoflayers.map(layer =>
            <div key={layer.id} className={styles.listItemDiv}>
                <LayerListItemContainer
                    id={layer.id}
                    name={layer.name}
                    src={layer.src}
                />
            </div>
            )}
        </div>
    );

    function PostTitle({ title }) {
        return <h1>{title}</h1>
      }
      
      function PostBody({ body }) {
        return (
          <article>
            <p>{body}</p>
          </article>
        );
      }
};

export default (injectIntl(LayerListComponent));