export default  
{
    introQuestionsAnswered: false,

    introQuestionActive: true,

    inputsAreNaN: undefined,

    inputsAreEmpty: undefined,

    menuIsActive: false,

    AddingMealActive: false,

    changeDailyNutrientsActive: false,

    introQuestionIsValid: undefined,

    globalStartingNutrients: [],

    dateOfNutrients: [  
            {
                isActive: false,
                date: '',
                noMeals: true,
                nutrients: [],
                meals: [],
            }
    ],

    questions : [
        {
            question: "What's your daily calorie goal?",
            answered: false,
            type: 'calories',
            amount: 0
        },
        {
            question: "What's your daily protein goal?",
            answered: false,
            type: 'protein',
            amount: 0
        },
        {
            question: "What's your daily carbs goal?",
            answered: false,
            type: 'carbs',
            amount: 0
        },
        {
            question: "What's your daily sodium goal?",
            answered: false,
            type: 'sodium',
            amount: 0
        },
        {
            question: "What's your daily fat goal?",
            answered: false,
            type: 'fat',
            amount: 0
        },
        {
            question: "What's your daily sugar goal?",
            answered: false,
            type: 'sugar',
            amount: 0
        },
        {
            question: "What's your daily potassium goal?",
            answered: false,
            type: 'potassium',
            amount: 0
        },
        {
            question: "What's your daily phosphorus goal?",
            answered: false,
            type: 'phosphorus',
            amount: 0
        },
    ],
}