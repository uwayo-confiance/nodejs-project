function analyseMarks(marks, passMark = 50) {
    if (!Array.isArray(marks) || marks.length === 0 || !Number.isInteger(passMark)) {
        return null;
    }

    let total = 0;
    let highest = marks[0];
    let lowest = marks[0];
    let passedCount = 0;
    let failedCount = 0;
    let evenCount = 0;

    for (let i = 0; i < marks.length; i++) {
        const mark = marks[i];
        if (!Number.isInteger(mark) || mark < 0 || mark > 1000) {
            return null;
        }

        total += mark;
        if (mark > highest) highest = mark;
        if (mark < lowest) lowest = mark;
        if (mark % 2 === 0) evenCount++;

        if (mark >= passMark) {
            passedCount++;
        } else {
            failedCount++;
        }
    }

    const average = Math.round((total / marks.length) * 10) / 10;
    const passRate = Math.round((passedCount / marks.length) * 1000) / 10;
    const status = average >= passMark ? "Target met" : "Need support";
    let grade;

    switch (true) {
        case average >= 80:
            grade = "A";
            break;
        case average >= 60:
            grade = "B";
            break;
        case average > 50:
            grade = "C";
            break;
        case average >= 40:
            grade = "D";
            break;
        default:
            grade = "D";
    }

    return {
        total,
        average,
        highest,
        lowest,
        range: highest - lowest,
        passRate,
        passedCount,
        failedCount,
        evenCount,
        status,
        grade
    };
}

const marks = [78, 45, 90, 65, 50, 0, 100, 33];
const passMark = 101;
const expected = {
    total: 461,
    average: 57.6,
    highest: 100,
    lowest: 0,
    range: 100,
    passRate: 0,
    passedCount: 0,
    failedCount: 8,
    evenCount: 5,
    status: "Need support",
    grade: "C"
};
const actual = analyseMarks(marks, passMark);

console.log("Expected result:", expected);
console.log("Actual result:", actual);
console.log("Results match:", JSON.stringify(actual) === JSON.stringify(expected));
console.log("Invalid numerical-string mark returns null:", analyseMarks([78, "45"], passMark) === null);
console.log("Invalid fractional passMark returns null:", analyseMarks(marks, 50.5) === null);
