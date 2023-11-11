// Example using react-native-webview

import React from 'react';
import { WebView } from 'react-native-webview';

const PythonWebView = () => {
    const pythonCode = `print("Hello World")`;

    return (
        <WebView
            source={{ html: `<script>${pythonCode}</script>` }}
            javaScriptEnabled={true}
        />
    );
};

export default PythonWebView;
