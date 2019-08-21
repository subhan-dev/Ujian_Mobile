import React, { Component } from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Button,
    Item, Input, Textarea
} from 'native-base'

import Fire from '../firebase'

// Untuk mengambil data dari navigate menggunakan
// navigation.getParam('nama parameternya') / 'data_diary'
class DetailKaryawanScreen extends Component {

    state = {
        // objDiary = {title: 'Contoh judul', diary: 'Kemarin minggu saya dirumah', id: Lwe45Dsdkk}
        nama: this.props.navigation.getParam('data_karyawan').nama,
        id: this.props.navigation.getParam('data_karyawan').id,
        usia: this.props.navigation.getParam('data_karyawan').usia,
        jabatan: this.props.navigation.getParam('data_karyawan').jabatan,
        objKaryawan: this.props.navigation.getParam('data_karyawan'),
        edit: false
    }

    onDeleteButton = async () => {
        // Menghapus data
       await Fire.database().ref(`karyawan/${this.props.uid}/${this.state.id}`).remove()
        // kembali ke halaman sebelumnya. 
       this.props.navigation.goBack()
    }

    onSaveButton = () => {
        Fire.database().ref(`karyawan/${this.props.uid}/${this.state.id}`)
        .update({
            nama: this.state.nama,
            usia: this.state.usia,
            jabatan: this.state.jabatan
        })

        // alert('berhasil edit')
        this.props.navigation.goBack()
    }

    onEditButton = () => {
        // Mengubah state.edit menjadi true
        this.setState({edit: true})
    }

    onCancelButton = () => {
        // Mengubah state.edit menjadi true
        this.setState({edit: false})
    }



    render() {
       if(this.state.edit) {
            // Tampilkan mode edit
            // var diary = this.state.objDiary
            return (
                <Container>
                        <View style={styles.container}>
                            <Text style={{fontSize: 20}}>Edit Karyawan</Text>
                            <View style={styles.wrapper}>
                                <Item rounded style={{marginBottom: 20}}>
                                    <Input
                                        value = {this.state.nama}
                                        placeholder='Nama'
                                        onChangeText={(text) => this.setState({nama: text})}
                                    />
                                </Item>
                                <Item rounded style={{marginBottom: 20}}>
                                    <Input
                                        value = {this.state.usia}
                                        placeholder='Usia'
                                        onChangeText={(text) => this.setState({usia: text})}
                                    />
                                </Item>
                                <Item rounded style={{marginBottom: 20}}>
                                    <Input
                                        value = {this.state.jabatan}
                                        placeholder='Jabatan'
                                        onChangeText={(text) => this.setState({jabatan: text})}
                                    />
                                </Item>
                                
                                <View style={styles.button}>
                                    <Button block onPress={this.onSaveButton}>
                                        <Text>SAVE</Text>
                                    </Button>
                                    <Button block onPress={this.onCancelButton}>
                                        <Text>CANCEL</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                </Container>
            )
       } else {
            // Tampilkan mode read
            var karyawan = this.state.objKaryawan
            return (
                <Container>
                    <Content>
                        <Card>
                            <CardItem style={styles.list}>
                                <Text>Nama</Text>
                                <Text>{karyawan.nama}</Text>
                            </CardItem>
                            <CardItem style={styles.list}>
                                <Text>Usia</Text>
                                <Text>{karyawan.usia}</Text>
                            </CardItem>
                            <CardItem style={styles.list}>
                                <Text>Jabatan</Text>
                                <Text>{karyawan.jabatan}</Text>
                            </CardItem>
                            <View style={styles.button}>
                                <Button block onPress={this.onEditButton}><Text>Edit</Text></Button>
                                <Button block onPress={this.onDeleteButton}><Text>Delete</Text></Button>
                            </View>
                        </Card>
                    </Content>
                </Container>
            )
       }
    }
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        height: 100,
        justifyContent: 'space-between',
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps)(DetailKaryawanScreen)