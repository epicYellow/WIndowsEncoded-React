import React from 'react';

const Example = () => {

    //example one and two
    let Question = true
    //class names
    let Questiontrue = "blue"
    let Questionfalse = "red"

    //example three and four
    let QuestionTwo = true
    //class names
    let QuestionTwotrue = "green"
    let QuestionTwofalse = "yellow"

    return (
    <>
        {/* Example one */}
        <div className={Question ? Questiontrue : Questionfalse}>
        </div>

        {/* Example two more than one question */}
        {/* If the question is false than ask another question (condition) */}
        <div className={Question ? Questiontrue : Question ? Questiontrue : Questionfalse}>
        </div>

        {/* Example more than one condition */}
        {/* Meaning you can add two class names for example */}
        {/* if you want no class added put "" in the false of your question like in example four */}
        {/* Remember back ticks and $ */}
        <div className={`${Question ? Questiontrue : Questionfalse}${QuestionTwo ? QuestionTwotrue : QuestionTwofalse}`}>
        </div>

        {/* Example four */}
        {/* If its false return no class in this case */}
        <div className={`${Question ? Questiontrue : Questionfalse}${QuestionTwo ? QuestionTwotrue : ""}`}>
        </div>
    </>
    );
};

export default Example;