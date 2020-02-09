import React, { PureComponent } from "react";
import { Image, TouchableOpacity, View } from "react-native";

export default class ScaledImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        Image.getSize(this.props.uri, (width, height) => {
            if (this.props.width && !this.props.height) {
                this.setState({
                    width: this.props.width,
                    height: height * (this.props.width / width)
                });
            } else if (!this.props.width && this.props.height) {
                this.setState({
                    width: width * (this.props.height / height),
                    height: this.props.height
                });
            } else {
                this.setState({ width: width, height: height });
            }
        });
    }

    render() {
        // See https://github.com/facebook/react-native/issues/1397 for image cache cleaning
        const key = this.props.uri + '?randomNum=' + new Date().getTime();
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Image
                    key={key}
                    source={{
                        uri: this.props.uri + '?randomNum=' + new Date().getTime(),
                        headers: {
                            'Cache-Control': 'no-store',
                        },
                    }}
                    style={{ height: this.state.height, width: this.state.width }}
                    onLoadEnd={this.props.onLoadEnd}
                />
            </TouchableOpacity>
        );
    }
}
