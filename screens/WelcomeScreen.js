import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Hella$avings</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'white' },
    title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#007AFF' },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: { color: 'white', textAlign: 'center', fontSize: 16 },
});

export default WelcomeScreen;
