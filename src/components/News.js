import React, { PureComponent } from "react";
import WebView from 'react-native-webview';

export default class News extends PureComponent {
    render() {
        return (
            <WebView
                source={{ uri: 'https://www.who.int/news-room/q-a-detail/q-a-coronaviruses' }}
            />
        )
    }
}
