import React, { PureComponent } from "react";
import SplashScreen from 'react-native-splash-screen'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default class ProtectYourself extends PureComponent {

    getImage(imageName) {
        switch(imageName) {
            case "blue-1": return require('../res/images/protection/blue-1.png');
            case "blue-2": return require('../res/images/protection/blue-2.png');
            case "blue-3": return require('../res/images/protection/blue-3.png');
            case "blue-4": return require('../res/images/protection/blue-4.png');
            case "blue-5": return require('../res/images/protection/blue-5.png');
            case "blue-6": return require('../res/images/protection/blue-6.png');
            case "blue-7": return require('../res/images/protection/blue-7.png');
            case "blue-8": return require('../res/images/protection/blue-8.png');
            case "blue-9": return require('../res/images/protection/blue-9.png');
            case "blue-10": return require('../res/images/protection/blue-10.png');
            case "1": return require('../res/images/protection/1.png');
            case "2": return require('../res/images/protection/2.png');
            case "3": return require('../res/images/protection/3.png');
            case "4": return require('../res/images/protection/4.png');
            case "5": return require('../res/images/protection/5.png');
        }
    }

    renderTitle(title) {
        return (
            <View style={styles.titleBox}>
                <Text style={styles.titleTextStyle}>{title}</Text>
                <View style={styles.titleBoxBorder}></View>
            </View>
        )
    }

    renderImage(imageName) {
        return (
            <View style={{
                width: '100%',
                alignItems: 'center',
            }}>
                <Image
                    source={this.getImage(imageName)}
                    style={{
                        borderRadius: 5,
                        width: 300,
                        height: 300
                    }}
                />
            </View>
        )
    }

    renderSeparator(size) {
        return (
            <View style={{height: size?size:8}}></View>
        );
    }

    componentDidMount = () => {
        SplashScreen.hide();
    };
    
    render() {
        return(
            <React.Fragment>
                <View style={{
                    width: '100%',
                    padding: 8,
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'red'
                    }}>How to protect yourself and others from Coronavirus!</Text>
                </View>
            
                <ScrollView>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 16,
                    }}>
                        {this.renderTitle("Protect yourself and others from getting sick")}
                        {this.renderImage("blue-1")}
                        {this.renderSeparator(4)}
                        {this.renderImage("blue-2")}
                        {this.renderSeparator(4)}
                        {this.renderImage("blue-3")}
                        {this.renderSeparator(4)}
                        {this.renderImage("blue-4")}
                        {this.renderSeparator(16)}
                        {this.renderTitle("Practice food safety")}
                        {this.renderImage("blue-5")}
                        {this.renderSeparator(4)}
                        {this.renderImage("blue-6")}
                        {this.renderSeparator(4)}
                        {this.renderImage("blue-7")}
                        {this.renderSeparator(16)}
                        {this.renderTitle("Shopping/Working in wet markets in China and Southeast Asia")}
                        {this.renderImage("blue-8")}
                        {this.renderSeparator(4)}
                        {this.renderImage("blue-9")}
                        {this.renderSeparator(4)}
                        {this.renderImage("blue-10")}
                        {this.renderSeparator(16)}
                        {this.renderTitle("Stay healthy while travelling")}
                        {this.renderImage("1")}
                        {this.renderSeparator(4)}
                        {this.renderImage("2")}
                        {this.renderSeparator(4)}
                        {this.renderImage("3")}
                        {this.renderSeparator(4)}
                        {this.renderImage("4")}
                        {this.renderSeparator(4)}
                        {this.renderImage("5")}
                        {this.renderSeparator(4)}
                    </View>
                </ScrollView>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    titleBox: {
        display: 'flex',
        flexDirection: "column",
    },
    titleBoxBorder: {
        width: 100,
        height: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#e8e8e8',
        marginBottom: 8
    },
    titleTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    imageStyle: {

    }
});
