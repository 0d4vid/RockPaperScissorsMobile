import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type GameChoice = 'rock' | 'paper' | 'scissors';

const GameScreen: React.FC = () => {
    const [playerChoice, setPlayerChoice] = React.useState<GameChoice | null>(null);
    const [computerChoice, setComputerChoice] = React.useState<GameChoice | null>(null);
    const [result, setResult] = React.useState<string>('');

    const choices: GameChoice [] = ['rock', 'paper', 'scissors'];

    const handlePlayerChoice = (choice: GameChoice) => {
        setPlayerChoice(choice);
        const computerSelection = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(computerSelection);
        determinateWinner(choice, computerSelection);
    };

    const determinateWinner = (player: GameChoice, computer: GameChoice) => {
        if (player === computer){
            setResult('Its a tie!');
            return;
        }
        if (player === 'rock' && computer === 'scissors' || player === 'paper' && computer === 'rock' || player === 'scissors' && computer === 'paper'){
            setResult('You win!');
        } else{
            setResult('Computer wins !');
        }
    };

    return(
        <View style={styles.container}>

            <Text style={styles.title}> Rock Paper Scissors </Text>

            <View style={styles.choicesContainer}>
                {choices.map((choice) => (
                    <TouchableOpacity key={choice} style={styles.choiceButton} onPress={() => handlePlayerChoice(choice)}>
                        <Text style={styles.choiceText}>{choice.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {playerChoice && computerChoice && (
                <View style={styles.resultContainer}>
                    <Text>Your choice: {playerChoice}</Text>
                    <Text>Computer choice: {computerChoice}</Text>
                    <Text style={styles.resultText}>{result}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    choicesContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 30,
    },
    choiceButton:{
        padding: 15,
        backgroundColor: '#ddd',
        borderRadius: 8,
    },
    choiceText:{
        fontSize: 18,
    },
    resultContainer:{
        marginTop: 30,
        alignItems:'center',
    },
    resultText:{
        fontSize: 20,
        fontWeight:'bold',
        marginTop: 10,
    },
});

export default GameScreen;
