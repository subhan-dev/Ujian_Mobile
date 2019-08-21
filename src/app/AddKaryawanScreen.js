import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Container, Text, Button, Item, Input} from 'native-base'

import Fire from '../firebase'

class AddKaryawanScreen extends Component {

    state = {
        nama: '',
        usia: '',
        jabatan: ''
    }

    
    addKaryawan = async () => {
        await Fire.database().ref(`karyawan/${this.props.uid}`)
        .push({
            nama: this.state.nama,
            usia: this.state.usia,
            jabatan: this.state.jabatan
        })

        // kembali ke halaman sebelumnya
        this.props.navigation.goBack()

    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>Create List Karyawan</Text>
                    <View style={styles.wrapper}>
                        <Item rounded style={{marginBottom: 20}}>
                            <Input
                                placeholder='Nama'
                                onChangeText={(text) => this.setState({nama: text})}
                            />
                        </Item>
                        <Item rounded style={{marginBottom: 20}}>
                            <Input
                                placeholder='Usia'
                                onChangeText={(text) => this.setState({usia: text})}
                            />
                        </Item>
                        <Item rounded style={{marginBottom: 20}}>
                            <Input
                                placeholder='Jabatan'
                                onChangeText={(text) => this.setState({jabatan: text})}
                            />
                        </Item>
                        <View style={styles.button}>
                            <Button block onPress={this.addKaryawan}>
                                <Text>Create</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
    button: {
        marginTop: 10
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(AddKaryawanScreen)