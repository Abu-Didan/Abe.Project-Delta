import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';

const PlanDocumentsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AdoptionAgreement')}
                >
                    <Text style={styles.buttonText}>View Adoption Agreement</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('BenefitSummary')}
                >
                    <Text style={styles.buttonText}>View Summary of Benefits</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PlanDocument')}
                >
                    <Text style={styles.buttonText}>View Plan Document</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#FF3B30" }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>

            {/* NAVBAR: To move it to the top, place <Navbar /> above the container */}
            <Navbar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: 'white' },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: { color: 'white', textAlign: 'center', fontSize: 16 },
});

export default PlanDocumentsScreen;
