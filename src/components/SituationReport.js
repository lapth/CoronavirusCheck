import React, { PureComponent } from "react";
import { Text, View, ActivityIndicator, ScrollView, Dimensions, ToastAndroid, Modal, Image, RefreshControl } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ScaledImage from "./ScaledImage";

const padding = {
    paddingLeft: 8,
    paddingRight: 8,
}

function formatNumber(number) {
    return number;
    // if (typeof number !== 'number') number = Number.parseInt(number);
    // return new Intl.NumberFormat(global.locale, { style: 'decimal'}).format(number);
}
export default class SituationReport extends PureComponent {
    // TODO: replace with yours
    static defaultProps = {
        realDataJson: 'http://IP:PORT/data/data.json',
        realDataWorldMap: 'http://IP:PORT/images/worldmap.png'
    }

    constructor(props) {
        super(props);
        this.state = {
            worldMapUri: props.realDataWorldMap,
            total: '0',
            death: '0',
            recovered: '0',
            updatedAt: 'loading...',
            countries: [],
            flags: {},
            loading: true,
            wolrdMapVisible: false
        }

        this.swapModal = this.swapModal.bind(this);
        this.reloadData = () => {
            if (this.timeout) {
                ToastAndroid.showWithGravity(
                    "Should not refresh too quickly, please wait a moment!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                this.setState({refreshing: false});
                return;
            }
            this.loadData().then(() => {
                this.setState({refreshing: false});
            });
            this.timeout = setTimeout(() => {
                this.timeout = undefined;
            }, 1000*60*5);
        }
    }

    renderLoading() {
        if (this.state.loading) {
            return (
                <React.Fragment>
                    <Text> </Text>
                    <ActivityIndicator size="small" color="#000000" />
                </React.Fragment>
            )
        } else return null;
    }

    renderUpdatedAt() {
        return (
            <View style={[padding, {
                flexDirection: 'row',
                marginTop: 16,
                marginBottom: 8
            }]}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: 'bold'
                }}>Updated at: {this.state.updatedAt}</Text>
                {this.renderLoading()}
            </View>
        )
    }

    renderWorldMap() {
        return (
            <ScaledImage
                uri={this.state.worldMapUri}
                width={Dimensions.get('window').width}
                onPress={this.swapModal}
            />
        )
    }

    renderContry(contry, ind) {
        renderFlag = (countryName, flags) => {
            if (flags[countryName]) {
                const flagUri = flags[countryName].replace('{0}', flags['prefix']);
                return (
                    <View style={{
                        marginLeft: 4,
                        marginRight: 4
                    }}>
                        <Image
                            source={{uri: flagUri}}
                            style={{height: 25, width: 35, resizeMode: 'stretch'}}
                        />
                    </View>
                )
            } else return (
                <View style={{
                    marginLeft: 4,
                    marginRight: 4,
                    height: 25, 
                    width: 35
                }}>
                </View>
            )
        }

        let backgroundColor =  '#f0f0f0';
        if (ind % 2) backgroundColor = null;
        return (
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 4,
                marginTop: 4,
                height: 35,
                backgroundColor,
                alignItems: 'center'
            }}>
                {renderFlag(contry.Country_Region, this.state.flags)}
                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        fontSize: 16,
                    }}>{contry.Country_Region}</Text>
                </View>
                <View style={{
                    width: 60,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'red',
                        fontWeight: 'bold'
                    }}>{formatNumber(contry.Confirmed)}</Text>
                </View>
                <View style={{
                    width: 62,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'green',
                        fontWeight: 'bold'
                    }}>{formatNumber(contry.Recovered)}</Text>
                </View>
                <View style={{
                    width: 60,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: 'grey',
                        fontWeight: 'bold'
                    }}>{formatNumber(contry.Deaths)}</Text>
                </View>
            </View>
        )
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.reloadData();
    }

    renderReport() {
        const headerBg={
            backgroundColor: '#e6f7ff',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRightWidth: 1,
            borderRightColor: '#ffffff'
        }
        const headerText={
            fontSize: 15,
            fontWeight: 'bold'
        }
        const redHeader={
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
        }
        return (
            <React.Fragment>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    backgroundColor: 'red',
                    height: 42
                }}>
                    <View style={redHeader}>
                        <Text style={{
                            fontSize: 12,
                            color: 'white'
                        }}>Confirmed</Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>{formatNumber(this.state.total)}</Text>
                    </View>
                    <View style={redHeader}>
                        <Text style={{
                            fontSize: 12,
                            color: 'white'
                        }}>Recovered</Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>{formatNumber(this.state.recovered)}</Text>
                    </View>
                    <View style={redHeader}>
                        <Text style={{
                            fontSize: 12,
                            color: 'white'
                        }}>Deaths</Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>{formatNumber(this.state.death)}</Text>
                    </View>
                </View>
                {this.renderSeparator(8)}
                <View style={[padding, {
                    flexDirection: 'row',
                    height: 35,
                    width: '100%',
                    alignContent: 'center'
                }]}>
                    <View style={[{
                        flex: 1
                    }, headerBg]}>
                        <Text style={headerText}>Country</Text>
                    </View>
                    <View style={[{width: 60,}, headerBg]}>
                        <Text style={headerText}>Cases</Text>
                    </View>
                    <View style={[{width: 62,}, headerBg]}>
                        <Text style={headerText}>Recov.</Text>
                    </View>
                    <View style={[{width: 60,}, headerBg]}>
                        <Text style={headerText}>Deaths</Text>
                    </View>
                </View>
                <ScrollView 
                    contentContainerStyle={padding}
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refreshing} 
                            onRefresh={this.onRefresh.bind(this)} />
                    }>
                    {
                        this.state.countries.map(
                            (contryData, ind) => {
                                if (contryData && contryData["__typename"] === "Country")
                                    return this.renderContry(contryData, ind)
                                else return null;
                            })
                    }
                    {this.renderSeparator(16)}
                </ScrollView>
            </React.Fragment>
        )
    }

    renderSeparator(size) {
        return (
            <View style={{height: size?size:8}}></View>
        );
    }

    async loadData() {
        this.setState({loading: true});
        try {
            let response = await fetch(
                this.props.realDataJson,
                {
                    headers: {
                        'Cache-Control': 'no-store'
                    }
                }
            );
            let jsonData;
            if (response) jsonData = await response.json();
            if (!jsonData) return;
            this.setState({
                worldMapUri: jsonData.worldMapUri?jsonData.worldMapUri:this.state.worldMapUri,
                total: jsonData.total,
                death: jsonData.deaths,
                recovered: jsonData.recovered,
                updatedAt: jsonData.updatedAt,
                countries: jsonData.countries,
                flags: jsonData.flags
            })
        } catch (err) {
            ToastAndroid.showWithGravity(
                "Can't read latest situation reports!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        } finally {
            this.setState({loading: false});
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillUnmount() {
        if (this.timeout) clearTimeout(this.timeout);
    }

    swapModal() {
        this.setState({ wolrdMapVisible: !this.state.wolrdMapVisible });
    }

    render() {
        const images = [{url: this.state.worldMapUri,},];
        return(
            <View style={{
                display: 'flex',
                flex: 1,
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'white'
            }}>
                {this.renderUpdatedAt()}
                {this.renderWorldMap()}
                {this.renderSeparator(16)}
                {this.renderReport()}
                <Modal 
                    visible={this.state.wolrdMapVisible} 
                    transparent={true}
                    onRequestClose={this.swapModal}>
                    <ImageViewer imageUrls={images}/>
                </Modal>
            </View>
        )
    }
}
