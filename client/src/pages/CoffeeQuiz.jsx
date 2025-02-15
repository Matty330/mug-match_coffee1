import React from 'react';
import "../index.css";
import { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const quizQuestions = [
    {
     question: "Do you like sweet, bitter, bold, or mild flavors in coffee?",
     options: [
        {text: "Sweet - I like my coffee with extra sugar or natural sweetness", type: "A"},
        {text: "Bitter - I like my coffee strong and rich", type: "B"},
        {text: "Bold - I like my coffee with a kick and underlying flavor profiles", type: "C"},
        {text: "Mild - I like my coffee simple and light", type: "D"}
     ]
    },
    {
        question: "What do you pair with your coffee in the morning?",
        options: [
            {text: "Pastries or sweet treats!", type:"A"},
            {text: "Eggs, Bacon, or toast... The works!", type: "B"},
            {text: "Fruit or nuts", type: "C"},
            {text: "Just my coffee! Maybe a granola bar at the bottom of my bag...", type: "D"}
        ]
    },
    {
        question: "How do you like your coffee brewed?",
        options: [
        {text: "Espresso - I love a good latte or cappucino", type: "A"},
        {text: "Drip - I like my coffee from a pot or a Keurig", type: "B"},
        {text: "French Press - I like my coffee strong and full of fun flavors!", type: "C"},
        {text: "Brewed Iced Coffee or Cold Brew - I like my coffee cold and refreshing", type: "D"}
        ]
    },
    {
        question: "How much coffee do you need to function?",
        options: [
        {text: "I need at least one cup of coffee to start my day", type: "A"},
        {text: "Coffee is my lifeblood, I cannot survive without it", type: "B"},
        {text: "Around 3 max cups of coffee a day for me", type: "C"},
        {text: "I can get by without any coffee, it's just a nice treat", type: "D"}
    ]
    },
    {
        question: "Do you often order the same coffee or do you like to try new things?",
        options: [
            {text: "I like to try new things everyday!", type: ["A", "D"]},
            {text: "I tend to stick with my favorites.", type: ["B", "C"]}
        ]
    }
];
const results ={
    A: "Caramel Macchiato - Either hot or cold, this sweet and creamy coffee is mixed with sweet vanilla and caramelly flavors. If you're interested in trying something new, you might like a Blonde Vanilla Latte!",
    B: "Americano - A classic Italian coffee drink made with espresso and hot or cold water depending on your preference. If you're interested in trying something new, you might like a dark roast drip coffee such as a single origin like Sumatra, or a blend like Verona!",
    C: "Blonde Roast Drip Coffee - A light and mellow coffee with a subtle flavor profile that you could enjoy by itself. If you're intereted in trying something new, you might like a Blonde Flat White!",
    D: "Cold Brew - A refreshing and smooth choice of coffee that offers a bold taste or sweet depending on ones mood and some fun syrups/milks they would like to add. If you're interested in trying something new, you might like a Nitro Cold Brew!",
};
const CoffeeQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({A:0, B:0, C:0, D:0});
    const [showresults, setShowresults] = useState(false);
    const [topChoice, setTopChoice] = useState('');
    const navigate = useNavigate();
    const handleAnswer = (type) => {
        setAnswers(prevAnswers => ({...prevAnswers, [type]: prevAnswers[type] + 1 }));
        const nextQuestion = currentQuestion +1;
        if(nextQuestion < quizQuestions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowresults(true);
        }
    };
    useEffect(() => {
        if(showresults) {
            const sortedAnswers = Object.entries(answers).sort((a,b) => b[1]);
            const mostChosen = results[sortedAnswers[0][0]];
            setTopChoice(mostChosen);
            localStorage.setItem('coffeeMatch', mostChosen);

            setTimeout(() => {
                navigate('/favorites');
            }, 2000);
        }
    },[showresults, answers, navigate]);
    return (
        <div className="quiz-container">
            {showresults ? (
                <h2>Your coffee match is: {topChoice}</h2>
            ) : (
                <>
                <h3>{quizQuestions[currentQuestion].question}</h3>
                {quizQuestions[currentQuestion].options.map((option) => (
                    <button key={option.text} onClick={() => handleAnswer(option.type)}>
                        {option.text}
                    </button>
                ))}
                </>
            )}
        </div>
    );
};

export default CoffeeQuiz;
