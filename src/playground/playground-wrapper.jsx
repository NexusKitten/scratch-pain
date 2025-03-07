import bindAll from 'lodash.bindall';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PaintEditor from '..';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/combine-reducers';
import { updatePlaygroundStat } from './reducers/playground-states';
import { intlInitialState, IntlProvider, injectIntl } from './reducers/intl.js';
import styles from './playground.css';
// scratch-render-fonts is a playground-only dep. Fonts are expected to be imported
// as a peer dependency, otherwise there will be two copies of them.
import {FONTS} from 'scratch-render-fonts';
import PropTypes from 'prop-types';

const appTarget = document.createElement('div');
appTarget.setAttribute('class', styles.playgroundContainer);
document.body.appendChild(appTarget);
const store = createStore(
    reducer,
    intlInitialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
class Playground extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'downloadImage',
            'handleUpdateName',
            'handleUpdateImage',
            'onUploadImage',
            'updateStageSize',
        ]);
        this.id = 0;
        this.reusableCanvas = document.createElement('canvas');
    }
    
    handleUpdateName (name) {
        this.props.updatePlaygroundState({name});
    }
    handleUpdateImage (isVector, image, rotationCenterX, rotationCenterY) {
        this.props.updatePlaygroundState({
            imageFormat: isVector ? 'svg' : 'png'
        });
        if (!isVector) {
            console.log(`Image width: ${image.width}    Image height: ${image.height}`);
        }
        console.log(`rotationCenterX: ${rotationCenterX}    rotationCenterY: ${rotationCenterY}`);
        if (isVector) {
            this.props.updatePlaygroundState({image, rotationCenterX, rotationCenterY});
        } else { // is Bitmap
            // image parameter has type ImageData
            // paint editor takes dataURI as input
            this.reusableCanvas.width = image.width;
            this.reusableCanvas.height = image.height;
            const context = this.reusableCanvas.getContext('2d');
            context.putImageData(image, 0, 0);
            this.props.updatePlaygroundState({
                image: this.reusableCanvas.toDataURL('image/png'),
                rotationCenterX: rotationCenterX,
                rotationCenterY: rotationCenterY
            });
        }
    }
    downloadImage () {
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);

        const format = this.props.playgroundState.imageFormat;
        let data = this.props.playgroundState.image;
        if (format === 'png' || format === 'jpg') {
            data = this.b64toByteArray(data);
        } else {
            data = [data];
        }
        const blob = new Blob(data, {type: format});
        const filename = `${this.props.playgroundState.name}.${format}`;
        if ('download' in HTMLAnchorElement.prototype) {
            const url = window.URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.type = blob.type;
            downloadLink.click();
            window.URL.revokeObjectURL(url);
        } else {
            // iOS Safari, open a new page and set href to data-uri
            let popup = window.open('', '_blank');
            const reader = new FileReader();
            reader.onloadend = function () {
                popup.location.href = reader.result;
                popup = null;
            };
            reader.readAsDataURL(blob);
        }
        document.body.removeChild(downloadLink);
    }
    b64toByteArray (b64Data, sliceSize=512) {
        // Remove header
        b64Data = b64Data.substring(b64Data.indexOf('base64,') + 7);

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return byteArrays;
    }
    uploadImage() {
        document.getElementById(styles.fileInput).click();
    }
    onUploadImage(event) {
        var file = event.target.files[0];
        var type = file.type === 'image/svg+xml' ? 'svg' :
            file.type === 'image/png' ? 'png' :
            file.type === 'image/jpg' ? 'jpg' :
            file.type === 'image/jpeg' ? 'jpg' :
            null;

        var reader = new FileReader();
        if (type === 'svg') {
            reader.readAsText(file,'UTF-8');
        } else if (type === 'png' || type === 'jpg'){
            reader.readAsDataURL(file);
        } else {
            alert("Couldn't read file type: " + file.type);
        }

        const that = this;
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!

            that.props.updatePlaygroundState({
                image: content,
                name: file.name.split('.').slice(0, -1).join('.'),
                imageId: ++that.id,
                imageFormat: type,
                rotationCenterX: undefined,
                rotationCenterY: undefined,
            });
       }
    }

    updateStageSize(event) {
        console.log(event.target.value);
        switch (event.target.id) {
            case "x":
                this.props.updatePlaygroundState({width: Number(event.target.value)});
                break;
            case "y":
                this.props.updatePlaygroundState({height: Number(event.target.value)});
        }
    }
    
    render () {
        return (
            <div className={styles.wrapper}>
                <PaintEditor
                    {...this.props.playgroundState}
                    onUpdateName={this.handleUpdateName}
                    onUpdateImage={this.handleUpdateImage}
                />
                <button className={styles.playgroundButton}  onClick={this.uploadImage}>Upload</button>
                <input id={styles.fileInput} type="file" name="name" onChange={this.onUploadImage} />
                <button className={styles.playgroundButton} onClick={this.downloadImage}>Download</button>
                <input id="x" placeholder="480" type="number" className={styles.playgroundButton} onChange={this.updateStageSize}></input>
                <input id="y" placeholder="360" type="number" className={styles.playgroundButton} onChange={this.updateStageSize}></input>
            </div>
        );
    }

}

Playground.propTypes = {
    updatePlaygroundState: PropTypes.func.isRequired,
    playgroundState: PropTypes.any,
};

const mapStateToProps = state => ({
    playgroundState: state.playground,
});
const mapDispatchToProps = dispatch => ({
    updatePlaygroundState: data => {
        dispatch(updatePlaygroundStat(data));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playground);

ReactDOM.render((
    <Provider store={store}>
        <IntlProvider>
            <Playground />
        </IntlProvider>
    </Provider>
), appTarget);
