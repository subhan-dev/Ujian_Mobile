import React, { Component } from 'react'
import {View, BackHandler, StyleSheet, FlatList} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {connect} from 'react-redux'
import {Button, Text, Container} from 'native-base'

import ListKaryawan from './components/ListKaryawan'
import {onLogout} from '../store/actions/index'

import Fire from '../firebase'

class HomeScreen extends Component {

    state = {
        snapShot: {}
    }

    onBackButton = () => {
        alert('Tombol back di tekan')
        // Menonaktifkan default function (kembali ke halaman sebelumnya)
        return true
    }

    getData = () => {
        // Get data
        Fire.database().ref(`karyawan/${this.props.uid}`)
        .once('value', (snapShot) => {
            // Cek apakah data di temukan
            console.log(snapShot)
            if(snapShot.exists()){
                this.setState({snapShot: snapShot.val()})
            }
        })
    }

    onAddKaryawan = () => {
        this.props.navigation.navigate('AddKaryawan')
    }

    onPressLogout = async () => {
        // Logout dari firebase
        await Fire.auth().signOut()
        // Logout dari redux
        this.props.onLogout()

        // kembali ke halaman auth
        this.props.navigation.navigate('Auth')
    }


    renderList = () => {
        // array of id dari setiap diary
        let keysKaryawan = Object.keys(this.state.snapShot)
        let listKaryawan = []

        // key : id dari diary
        keysKaryawan.forEach((key) => {
            listKaryawan.push({
                nama : this.state.snapShot[key].nama,
                usia : this.state.snapShot[key].usia,
                jabatan : this.state.snapShot[key].jabatan,
                id: key
            })
        })


        // [{title, diary, date}{}{}]
        return <FlatList
                    keyExtractor = {(item) => item.id}
                    style = {styles.flaslist}
                    data={listKaryawan}
                    renderItem ={(asd)=>{
                        return <ListKaryawan data={asd} key={asd.id}/>
                    }}
                />
    }

    render() {
        return (
            <Container>
                <NavigationEvents
                    // ComponentDidMount
                    onDidFocus = {() => {
                        // non aktifkan tombol back pada device
                        BackHandler.addEventListener('hardwareBackPress', this.onBackButton)
                        // get semua diary milik user
                        this.getData()
                        console.log(this.props.uid)
                    }}

                    // ComponentWillUnmount
                    onWillBlur = {() => {
                        BackHandler.removeEventListener('hardwareBackPress', this.onBackButton)
                    }}
                />

                <View style={styles.container}>
                    <Text>List Karyawan</Text>
                    
                    
                    {this.renderList()}
                    
                    <View style={styles.button}>
                        <Button onPress={this.onAddKaryawan}>
                            <Text>Add Karyawan</Text>
                        </Button>
                    </View>
                    <View style={styles.button}>
                        <Button onPress={this.onPressLogout}>
                            <Text>Log out</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginVertical: 20
    },
    flaslist: {
        alignSelf: 'stretch'
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps, {onLogout})(HomeScreen)