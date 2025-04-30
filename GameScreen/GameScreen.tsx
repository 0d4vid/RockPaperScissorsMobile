import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

type GameChoice = 'rock' | 'paper' | 'scissors';

const GameScreen: React.FC = () => {
    const [playerChoice, setPlayerChoice] = React.useState<GameChoice | null>(null);
    const [computerChoice, setComputerChoice] = React.useState<GameChoice | null>(null);
    const [result, setResult] = React.useState<string>('');
    const [playerScore, setPlayerScore] = React.useState<number>(0);
    const[computerScore, setComputerScore] = React.useState<number>(0);
    const [round, setRound] = React.useState<number>(1);
    const [gameOver, setGameOver] = React.useState<boolean>(false);
    const scaleAnim = React.useRef(new Animated.Value(1)).current;
    const fadeAnim = React.useRef(new Animated.Value(1)).current;

    const choices: GameChoice [] = ['rock', 'paper', 'scissors'];
    const MAX_ROUNDS = 3;

    const animatedChoice = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim,{
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    //animation values

    const handlePlayerChoice = (choice: GameChoice) => {
        animatedChoice();
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
            setPlayerScore(prev => prev + 10);
        } else{
            setResult('Computer wins !');
            setComputerScore(prev => prev + 10);
        }

        // Check if game should continue
        if (round < MAX_ROUNDS){
            setRound(prev => prev + 1);
        } else{
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult('');
        setPlayerScore(0);
        setComputerScore(0);
        setRound(1);
        setGameOver(false);
    };

    return(
        <View style={styles.container}>

            <Animated.Text style={[styles.title, {transform:[{scale: scaleAnim}]}]}> Rock✊ Paper✋ Scissors✌️ </Animated.Text>
            <View style={styles.scoreBoard}>
                <Text style={styles.roundText}>Round: {round}/{MAX_ROUNDS}</Text>
                <Text style={styles.scoreText}>You: {playerScore} - Computer: {computerScore}</Text>
            </View>

            {!gameOver ? (
                <>
               <Animated.View style={[styles.choicesDisplay, { opacity: fadeAnim }]}>
                        <View style={styles.choiceDisplay}>
                            <Animated.Text
                                style={[styles.choiceEmoji, { transform: [{ scale: scaleAnim }] }]}>
                                {playerChoice ? getEmoji(playerChoice) : '❓'}
                            </Animated.Text>
                            <Text style={styles.choiceLabel}>Your Choice</Text>
                        </View>
                        <View style={styles.choiceDisplay}>
                            <Animated.Text
                                style={[styles.choiceEmoji, { transform: [{ scale: scaleAnim }] }]}>
                                {computerChoice ? getEmoji(computerChoice) : '❓'}
                            </Animated.Text>
                            <Text style={styles.choiceLabel}>Computer</Text>
                        </View>
                    </Animated.View>

                    <View style={styles.choicesContainer}>
                        {choices.map((choice) => (
                            <TouchableOpacity
                                key={choice}
                                style={[
                                    styles.choiceButton,
                                    styles[`${choice}Button`],
                                    { elevation: 5 }
                                ]}
                                onPress={() => handlePlayerChoice(choice)}>
                                <Text style={styles.choiceText}>{getEmoji(choice)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
            </>
            ) : (
                <View style={styles.gameOverText}>
                    <Text style={styles.gameOverText}>Game Over!</Text>
                    <Text style={styles.finalScoreText}>
                        Final Score: You {playerScore} - computer {computerScore}
                    </Text>
                    <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
                        <Text style={styles.resetButtonText}>Play Again</Text>
                    </TouchableOpacity>
                </View>
            )}

            {playerChoice && computerChoice && !gameOver && (
                <View style={styles.resultContainer}>
                    <Text>Your choice: {playerChoice}</Text>
                    <Text>Computer choice: {computerChoice}</Text>
                    <Text style={styles.resultText}>{result}</Text>
                </View>
            )}
            {result && (
               <Animated.View
               style={[
                   styles.resultContainer,
                   result.includes('win!') ? styles.winResult :
                   result.includes('wins') ? styles.loseResult :
                   styles.tieResult,
                   { transform: [{ scale: scaleAnim }] },
               ]}>
               <Text style={styles.resultText}>{result}</Text>
           </Animated.View>
            )}
        </View>
    );
};

const getEmoji = (choice: GameChoice) => {
    switch(choice){
        case 'rock': return '✊';
        case 'paper': return '✋';
        case 'scissors': return '✌️';
    }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title:{
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scoreBoard: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
        width: '80%',
        alignItems: 'center',
    },
    choiceLabel: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    choicesDisplay: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 30,
    },
    choiceDisplay: {
        alignItems: 'center',
    },
    choiceEmoji: {
        fontSize: 50,
        marginBottom: 10,
    },
    choicesContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 30,
    },
    choiceButton: {
        padding: 20,
        margin: 3,
        borderRadius: '50%',
        minWidth: 80,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    rockButton: {
        backgroundColor: '#db4646',
    },
    paperButton: {
        backgroundColor: '#3d74cd',
    },
    scissorsButton: {
        backgroundColor: '#4aac6e',
    },
    choiceText:{
        fontSize: 18,
        color: 'white',
    },
    resultContainer:{
        marginTop: 30,
        padding: 20,
        borderRadius: 15,
        width: '80%',
        alignItems:'center',
        elevation: 5,
    },
    winResult: {
        backgroundColor: '#dcfce7',
    },
    loseResult: {
        backgroundColor: '#fee2e2',
    },
    tieResult: {
        backgroundColor: '#dbeafe',
    },
    resultText:{
        fontSize: 20,
        fontWeight:'bold',
        marginTop: 10,
    },
    roundText:{
        fontSize: 18,
        marginBottom: 10,
    },
    scoreText:{
        fontSize: 18,
        marginBottom: 20,
    },
    gameOverContainer:{
        alignItems:'center',
        marginTop: 30,
    },
    gameOverText:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom:20,
    },
    finalScoreText:{
        fontSize: 20,
        marginBottom: 30,
    },
    resetButton:{
        padding: 15,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
    },
    resetButtonText:{
        fontSize: 18,
        color: 'white',
    },
});

export default GameScreen;
