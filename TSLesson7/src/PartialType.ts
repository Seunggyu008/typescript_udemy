interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal (
    title: string, description: string, date: Date
    ): CourseGoal {
    //Partial Type changes the types so that all the properties are optional.
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    //however, using partial type does not allow return because it is not type CourseGoal, but Partial<CourseGoal>
    //therefore, using 'as' keyword would convert the type so that it can be returned.
    return courseGoal as CourseGoal;
}